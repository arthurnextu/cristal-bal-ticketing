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
    console.log("[CHECK-IN] Function started");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { ticketCode } = await req.json();

    console.log("[CHECK-IN] Ticket code:", ticketCode);

    // Rechercher la réservation
    const { data: reservation, error: fetchError } = await supabase
      .from("reservations")
      .select("*")
      .eq("ticket_code", ticketCode)
      .single();

    if (fetchError || !reservation) {
      console.error("[CHECK-IN] Ticket not found:", fetchError);
      return new Response(
        JSON.stringify({ 
          status: "invalid",
          message: "Billet invalide" 
        }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Vérifier si le billet est confirmé
    if (reservation.status !== "confirmed") {
      return new Response(
        JSON.stringify({ 
          status: "invalid",
          message: "Billet non confirmé" 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Vérifier si déjà scanné
    if (reservation.presence_status === "present") {
      return new Response(
        JSON.stringify({ 
          status: "already_scanned",
          message: "Billet déjà scanné",
          reservation: {
            prenom: reservation.prenom,
            nom: reservation.nom,
            nombreBillets: reservation.nombre_billets,
          }
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Marquer comme présent
    const { error: updateError } = await supabase
      .from("reservations")
      .update({ presence_status: "present" })
      .eq("id", reservation.id);

    if (updateError) {
      console.error("[CHECK-IN] Error updating presence:", updateError);
      return new Response(
        JSON.stringify({ error: "Erreur lors de la mise à jour." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("[CHECK-IN] Check-in successful");

    return new Response(
      JSON.stringify({ 
        status: "valid",
        message: "Billet valide, bienvenue !",
        reservation: {
          prenom: reservation.prenom,
          nom: reservation.nom,
          nombreBillets: reservation.nombre_billets,
        }
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[CHECK-IN] Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Erreur serveur interne." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
