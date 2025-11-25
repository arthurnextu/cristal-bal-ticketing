import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Mail, Loader2 } from "lucide-react";

const PaiementSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const reservationId = searchParams.get("reservationId");

  useEffect(() => {
    // Simuler un délai pour l'affichage
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">Confirmation de votre paiement...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 animate-scale-in">
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Paiement confirmé !
              </h1>
              <p className="text-xl text-muted-foreground">
                Votre réservation a été validée avec succès
              </p>
            </div>

            <Card className="card-bordered bg-card p-8 mb-8 hover-lift animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-3 text-lg">
                  <Mail className="h-6 w-6 text-primary" />
                  <p className="text-muted-foreground">
                    Un email de confirmation avec votre billet a été envoyé
                  </p>
                </div>

                <div className="p-6 bg-accent/20 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Que faire ensuite ?</h3>
                  <ul className="space-y-3 text-left text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">1.</span>
                      <span>Consultez votre boîte mail pour récupérer votre billet électronique</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">2.</span>
                      <span>Conservez votre QR code pour le présenter à l'entrée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">3.</span>
                      <span>Préparez votre tenue élégante aux couleurs de Noël (vert, rouge, blanc)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">4.</span>
                      <span>Rendez-vous le 19 décembre 2025 à partir de 19h00</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-card-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    Vous n'avez pas reçu l'email ? Vérifiez vos courriers indésirables ou contactez-nous :
                  </p>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Email :</strong>{" "}
                      <a href="mailto:infomairie@mairie-bordeaux.fr" className="text-primary hover:underline">
                        infomairie@mairie-bordeaux.fr
                      </a>
                    </p>
                    <p>
                      <strong>Téléphone :</strong>{" "}
                      <a href="tel:0556102030" className="text-primary hover:underline">
                        05 56 10 20 30
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-4 animate-fade-in">
              <Button
                onClick={() => navigate("/")}
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground btn-christmas"
              >
                Retour à l'accueil
              </Button>

              <p className="text-sm text-muted-foreground">
                Nous avons hâte de vous accueillir au Bal de cristal ! ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaiementSuccess;
