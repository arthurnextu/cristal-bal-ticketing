import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[CREATE-PAYMENT] Function started");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { reservationId } = await req.json();

    console.log("[CREATE-PAYMENT] Reservation ID:", reservationId);

    // Récupérer la réservation
    const { data: reservation, error: fetchError } = await supabase
      .from("reservations")
      .select("*")
      .eq("id", reservationId)
      .single();

    if (fetchError || !reservation) {
      console.error("[CREATE-PAYMENT] Reservation not found:", fetchError);
      return new Response(
        JSON.stringify({ error: "Réservation introuvable." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Vérifier que la réservation n'est pas déjà confirmée
    if (reservation.status === "confirmed") {
      return new Response(
        JSON.stringify({ error: "Cette réservation a déjà été payée." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const montantTotal = reservation.nombre_billets * 40 * 100; // En centimes

    // Créer la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Le Bal de cristal - Billet(s)",
              description: `${reservation.nombre_billets} billet(s) pour Le Bal de cristal - 19 décembre 2025`,
            },
            unit_amount: 2000, // 40€
          },
          quantity: reservation.nombre_billets,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/paiement/success?reservationId=${reservationId}`,
      cancel_url: `${req.headers.get("origin")}/paiement/cancel?reservationId=${reservationId}`,
      customer_email: reservation.email,
      metadata: {
        reservationId: reservationId,
        ticketCode: reservation.ticket_code,
      },
    });

    console.log("[CREATE-PAYMENT] Session created:", session.id);

    return new Response(
      JSON.stringify({ url: session.url, sessionId: session.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[CREATE-PAYMENT] Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Erreur lors de la création de la session de paiement.";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
