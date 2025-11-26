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
    console.log("[CONFIRM-PAYMENT] Function started");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { sessionId, reservationId } = await req.json();

    console.log("[CONFIRM-PAYMENT] Session ID:", sessionId, "Reservation ID:", reservationId);

    // Récupérer la session Stripe pour vérifier le paiement
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("[CONFIRM-PAYMENT] Stripe session retrieved, payment_status:", session.payment_status);

    if (session.payment_status !== "paid") {
      console.error("[CONFIRM-PAYMENT] Payment not confirmed:", session.payment_status);
      return new Response(
        JSON.stringify({ error: "Le paiement n'a pas été confirmé." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Mettre à jour la réservation
    console.log("[CONFIRM-PAYMENT] Updating reservation status to 'confirmed'...");
    const { data: reservation, error: updateError } = await supabase
      .from("reservations")
      .update({ status: "confirmed" })
      .eq("id", reservationId)
      .select()
      .single();

    if (updateError) {
      console.error("[CONFIRM-PAYMENT] Error updating reservation:", updateError);
      return new Response(
        JSON.stringify({ error: "Erreur lors de la mise à jour de la réservation." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("[CONFIRM-PAYMENT] ✅ Reservation confirmed:", {
      id: reservation.id,
      email: reservation.email,
      ticket_code: reservation.ticket_code,
      nombre_billets: reservation.nombre_billets
    });

    // Appeler la fonction d'envoi d'email
    console.log("[CONFIRM-PAYMENT] Calling send-confirmation-email function...");
    const { data: emailData, error: emailError } = await supabase.functions.invoke("send-confirmation-email", {
      body: { reservationId },
    });

    if (emailError) {
      console.error("[CONFIRM-PAYMENT] ❌ Error sending email:", emailError);
      // On ne retourne pas d'erreur car la réservation est confirmée
    } else {
      console.log("[CONFIRM-PAYMENT] ✅ Email function called successfully:", emailData);
    }

    console.log("[CONFIRM-PAYMENT] ✅ Payment confirmed successfully");

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[CONFIRM-PAYMENT] Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Erreur lors de la confirmation du paiement.";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
