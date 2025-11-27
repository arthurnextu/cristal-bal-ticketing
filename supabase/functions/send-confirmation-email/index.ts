import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import QRCode from "https://esm.sh/qrcode@1.5.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[SEND-EMAIL] Function started");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { reservationId } = await req.json();

    console.log("[SEND-EMAIL] Reservation ID:", reservationId);

    // Récupérer la réservation
    const { data: reservation, error: fetchError } = await supabase
      .from("reservations")
      .select("*")
      .eq("id", reservationId)
      .single();

    if (fetchError || !reservation) {
      console.error("[SEND-EMAIL] Reservation not found:", fetchError);
      return new Response(
        JSON.stringify({ error: "Réservation introuvable." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Générer le QR code
    const qrCodeUrl = `https://bal-de-cristal.vercel.app/${reservation.ticket_code}`;
    const qrCodeDataUrl = await QRCode.toDataURL(qrCodeUrl, { width: 300 });

    // Préparer le contenu de l'email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Lato', sans-serif; line-height: 1.6; color: #0B1020; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D8B560 0%, #FFF3C2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { color: #FFFFFF; margin: 0; font-family: 'Cormorant Garamond', serif; font-size: 32px; }
            .content { background: #FFFFFF; border: 2px solid #FFF3C2; border-radius: 0 0 8px 8px; padding: 30px; }
            .info-box { background: #F5F1E8; border: 1px solid #FFF3C2; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .qr-code { text-align: center; margin: 30px 0; }
            .qr-code img { border: 4px solid #D8B560; border-radius: 8px; }
            .ticket-code { background: #7B1533; color: #FFFFFF; padding: 15px; border-radius: 8px; text-align: center; font-size: 20px; font-weight: bold; letter-spacing: 2px; margin: 20px 0; }
            .dress-code { display: flex; justify-content: space-around; margin: 20px 0; }
            .dress-code-item { text-align: center; }
            .dress-code-circle { width: 50px; height: 50px; border-radius: 50%; margin: 0 auto 10px; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #FFF3C2; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Le Bal de cristal</h1>
              <p style="color: #FFFFFF; margin: 10px 0 0 0;">Votre réservation est confirmée !</p>
            </div>
            <div class="content">
              <h2 style="color: #D8B560; font-family: 'Cormorant Garamond', serif;">Bonjour ${reservation.prenom} ${reservation.nom},</h2>
              <p>Merci pour votre réservation pour Le Bal de cristal. Nous sommes ravis de vous accueillir à cette soirée exceptionnelle !</p>
              
              <div class="info-box">
                <h3 style="color: #7B1533; margin-top: 0;">📅 Informations de l'événement</h3>
                <p><strong>Date :</strong> 19 décembre 2025</p>
                <p><strong>Horaires :</strong> 19h00 - 01h00</p>
                <p><strong>Ouverture du bal :</strong> 21h30</p>
                <p><strong>Lieu :</strong> Maison Cantonale, quartier La Bastide, Bordeaux</p>
                <p><strong>Nombre de billets :</strong> ${reservation.nombre_billets}</p>
              </div>
              
              <div class="qr-code">
                <h3 style="color: #D8B560; font-family: 'Cormorant Garamond', serif;">Votre billet électronique</h3>
                <img src="${qrCodeDataUrl}" alt="QR Code" />
                <p style="color: #666; font-size: 14px;">Présentez ce QR code à l'entrée</p>
              </div>
              
              <div class="ticket-code">
                ${reservation.ticket_code}
              </div>
              <p style="text-align: center; color: #666; font-size: 12px;">Code de billet (en secours)</p>
              
              <div class="info-box">
                <h3 style="color: #7B1533; margin-top: 0;">👔 Dress code</h3>
                <p>Tenue de soirée élégante aux couleurs de Noël :</p>
                <div class="dress-code">
                  <div class="dress-code-item">
                    <div class="dress-code-circle" style="background-color: #228B22;"></div>
                    <p>Vert</p>
                  </div>
                  <div class="dress-code-item">
                    <div class="dress-code-circle" style="background-color: #DC143C;"></div>
                    <p>Rouge</p>
                  </div>
                  <div class="dress-code-item">
                    <div class="dress-code-circle" style="background-color: #FFFFFF; border: 2px solid #ccc;"></div>
                    <p>Blanc</p>
                  </div>
                </div>
              </div>
              
              <div class="info-box">
                <h3 style="color: #7B1533; margin-top: 0;">🎉 Au programme</h3>
                <ul style="padding-left: 20px;">
                  <li>Cocktail de bienvenue et vestiaire</li>
                  <li>Dîner buffet gastronomique</li>
                  <li>Ouverture du bal à 21h30</li>
                  <li>Animation DJ toute la soirée</li>
                  <li>Photobooth et tombola avec cadeaux</li>
                  <li>Moment slow de Noël à minuit</li>
                </ul>
              </div>
              
              <p style="margin-top: 30px;">Nous vous souhaitons une merveilleuse soirée au Bal de cristal !</p>
              <p style="color: #7B1533; font-weight: bold;">À très bientôt,<br>L'équipe organisatrice</p>
              
              <div class="footer">
                <p><strong>Contact :</strong><br>
                Email : infomairie@mairie-bordeaux.fr<br>
                Téléphone : 05 56 10 20 30</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Le Bal de cristal <onboarding@resend.dev>",
      to: [reservation.email],
      subject: "Votre billet pour Le Bal de cristal – 19 décembre 2025",
      html: emailHtml,
    });

    console.log("[SEND-EMAIL] Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("[SEND-EMAIL] Error:", error);
    const errorMessage = error?.message || "Erreur lors de l'envoi de l'email.";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
