import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";

const PaiementCancel = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="py-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 animate-scale-in">
              <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="h-16 w-16 text-orange-600 dark:text-orange-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Paiement annulé
              </h1>
              <p className="text-xl text-muted-foreground">
                Votre réservation n'a pas été confirmée
              </p>
            </div>

            <Card className="card-bordered bg-card p-8 mb-8 hover-lift animate-fade-in">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground">
                  Le paiement a été annulé. Aucun montant n'a été débité de votre compte.
                </p>

                <div className="p-6 bg-accent/20 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Que s'est-il passé ?</h3>
                  <div className="space-y-3 text-left text-muted-foreground">
                    <p>
                      Vous avez annulé le processus de paiement ou celui-ci a été interrompu.
                      Votre réservation n'a pas été finalisée et les places ne sont pas réservées.
                    </p>
                    <p>
                      Si vous souhaitez toujours participer au Bal de cristal, vous pouvez :
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>Recommencer une nouvelle réservation</li>
                      <li>Nous contacter si vous rencontrez des difficultés</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-card-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    Besoin d'aide pour finaliser votre réservation ?
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
                onClick={() => navigate("/billetterie")}
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground btn-christmas"
              >
                Retourner à la billetterie
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="w-full"
              >
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaiementCancel;
