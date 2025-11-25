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

    if (session.payment_status !== "paid") {
      return new Response(
        JSON.stringify({ error: "Le paiement n'a pas été confirmé." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Mettre à jour la réservation
    const { error: updateError } = await supabase
      .from("reservations")
      .update({ status: "confirmed" })
      .eq("id", reservationId);

    if (updateError) {
      console.error("[CONFIRM-PAYMENT] Error updating reservation:", updateError);
      return new Response(
        JSON.stringify({ error: "Erreur lors de la mise à jour de la réservation." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Appeler la fonction d'envoi d'email
    const { error: emailError } = await supabase.functions.invoke("send-confirmation-email", {
      body: { reservationId },
    });

    if (emailError) {
      console.error("[CONFIRM-PAYMENT] Error sending email:", emailError);
      // On ne retourne pas d'erreur car la réservation est confirmée
    }

    console.log("[CONFIRM-PAYMENT] Payment confirmed successfully");

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[CONFIRM-PAYMENT] Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Erreur lors de la confirmation du paiement." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
