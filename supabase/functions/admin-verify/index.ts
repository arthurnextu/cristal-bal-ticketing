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
    console.log("[ADMIN-VERIFY] Function started");

    const { password } = await req.json();

    const adminPassword = Deno.env.get("ADMIN_PASSWORD");
    
    if (!adminPassword) {
      console.error("[ADMIN-VERIFY] ADMIN_PASSWORD not configured");
      return new Response(
        JSON.stringify({ error: "Configuration serveur manquante" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (password !== adminPassword) {
      console.log("[ADMIN-VERIFY] Invalid password attempt");
      return new Response(
        JSON.stringify({ error: "Mot de passe incorrect" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("[ADMIN-VERIFY] Password verified successfully");

    // Générer un token simple (dans un vrai système, utiliser JWT)
    const token = `admin_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

    return new Response(
      JSON.stringify({ token, success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[ADMIN-VERIFY] Error:", error);
    return new Response(
      JSON.stringify({ error: "Erreur serveur" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
