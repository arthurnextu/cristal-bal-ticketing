import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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
    console.log("[INIT-RESERVATION] Function started");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { prenom, nom, email, nombreBillets } = await req.json();

    console.log("[INIT-RESERVATION] Received request:", { prenom, nom, email, nombreBillets });

    // Validation des données
    if (!prenom || !nom || !email || !nombreBillets || nombreBillets < 1) {
      return new Response(
        JSON.stringify({ error: "Données invalides. Tous les champs sont requis." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Vérifier la période de billetterie (désactivé pour les tests)
    // IMPORTANT : Réactiver ces vérifications avant la mise en production
    /*
    const now = new Date();
    const ouverture = new Date("2025-11-28T00:00:00");
    const fermeture = new Date("2025-12-12T23:59:59");

    if (now < ouverture) {
      return new Response(
        JSON.stringify({ error: "La billetterie ouvrira le 28 novembre 2025." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (now > fermeture) {
      return new Response(
        JSON.stringify({ error: "La billetterie est maintenant fermée." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    */

    console.log("[INIT-RESERVATION] Date verification disabled for testing");

    // Vérifier la capacité
    const { data: reservations, error: countError } = await supabase
      .from("reservations")
      .select("nombre_billets")
      .in("status", ["confirmed", "pending_payment"]);

    if (countError) {
      console.error("[INIT-RESERVATION] Error counting reservations:", countError);
      return new Response(
        JSON.stringify({ error: "Erreur lors de la vérification de la capacité." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const totalReserved = (reservations ?? []).reduce(
  (sum, r) => sum + r.nombre_billets,
  0
);
    const placesRestantes = 200 - totalReserved;

    console.log("[INIT-RESERVATION] Places restantes:", placesRestantes);

    if (nombreBillets > placesRestantes) {
      return new Response(
        JSON.stringify({ 
          error: `Il ne reste plus assez de places disponibles. Places restantes : ${placesRestantes}` 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Générer un code de billet unique
    const ticketCode = `CRISTAL-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    // Créer la réservation
    const { data: reservation, error: insertError } = await supabase
      .from("reservations")
      .insert({
        ticket_code: ticketCode,
        prenom,
        nom,
        email,
        nombre_billets: nombreBillets,
        status: "pending_payment",
        presence_status: "non_arrive",
      })
      .select()
      .single();

    if (insertError) {
      console.error("[INIT-RESERVATION] Error creating reservation:", insertError);
      return new Response(
        JSON.stringify({ error: "Erreur lors de la création de la réservation." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("[INIT-RESERVATION] Reservation created:", reservation.id);

    return new Response(
      JSON.stringify({
        reservationId: reservation.id,
        ticketCode: reservation.ticket_code,
        montantTotal: nombreBillets * 40,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[INIT-RESERVATION] Error:", error);
    return new Response(
      JSON.stringify({ error: "Erreur serveur interne." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
