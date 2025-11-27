import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Calendar, Clock, MapPin, Mail, User, Ticket } from "lucide-react";

const Paiement = () => {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [reservation, setReservation] = useState<any>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    if (reservationId) {
      fetchReservation();
    }
  }, [reservationId]);

  const fetchReservation = async () => {
    try {
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("id", reservationId)
        .single();

      if (error) throw error;

      if (data.status === "confirmed") {
        toast({
          title: "Déjà payé",
          description: "Cette réservation a déjà été confirmée.",
        });
        navigate("/");
        return;
      }

      setReservation(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching reservation:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de récupérer la réservation.",
      });
      navigate("/billetterie");
    }
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);

    try {
      console.log("Creating payment session for reservation:", reservationId);

      const { data, error } = await supabase.functions.invoke("create-payment-session", {
        body: { reservationId },
      });

      if (error) {
        console.error("Error from edge function:", error);
        throw new Error(error.message || "Erreur lors de la création de la session de paiement");
      }

      if (data.error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: data.error,
        });
        setIsProcessingPayment(false);
        return;
      }

      console.log("Payment session created:", data);

      // Rediriger vers Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error("Error processing payment:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
      });
      setIsProcessingPayment(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!reservation) {
    return (
      <Layout>
        <div className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Réservation introuvable</h1>
            <Button onClick={() => navigate("/billetterie")}>
              Retour à la billetterie
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const montantTotal = reservation.nombre_billets * 40;

  return (
    <Layout>
      <div className="py-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 space-y-4 animate-scale-in">
              <h1 className="text-4xl md:text-5xl font-bold text-primary">
                Finaliser votre réservation
              </h1>
              <p className="text-lg text-muted-foreground">
                Dernière étape avant de recevoir vos billets
              </p>
            </div>

            <Card className="card-bordered bg-card p-8 mb-8 hover-lift animate-fade-in">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Récapitulatif de votre réservation
              </h2>

              <div className="space-y-6">
                {/* Informations personnelles */}
                <div className="p-6 bg-accent/20 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Vos informations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Nom complet</p>
                      <p className="font-medium">
                        {reservation.prenom} {reservation.nom}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        Email
                      </p>
                      <p className="font-medium">{reservation.email}</p>
                    </div>
                  </div>
                </div>

                {/* Détails de l'événement */}
                <div className="p-6 bg-accent/20 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-primary" />
                    Le Bal de cristal
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Date
                      </p>
                      <p className="font-medium">19 décembre 2025</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Horaires
                      </p>
                      <p className="font-medium">19h00 - 01h00</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        Lieu
                      </p>
                      <p className="font-medium">Maison Cantonale</p>
                    </div>
                  </div>
                </div>

                {/* Montant */}
                <div className="border-t border-card-border pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-lg">
                      <span className="text-muted-foreground">Prix unitaire</span>
                      <span className="font-semibold">40€</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-muted-foreground">Nombre de billets</span>
                      <span className="font-semibold">{reservation.nombre_billets}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-bold pt-4 border-t border-card-border">
                      <span>Total à payer</span>
                      <span className="text-primary">{montantTotal}€</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-4 animate-fade-in">
              <Button
                onClick={handlePayment}
                disabled={isProcessingPayment}
                size="lg"
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg py-6 btn-christmas"
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Redirection vers le paiement...
                  </>
                ) : (
                  <>Payer maintenant - {montantTotal}€</>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate("/billetterie")}
                disabled={isProcessingPayment}
                className="w-full"
              >
                Annuler
              </Button>
            </div>

            <div className="mt-8 p-6 bg-muted/50 rounded-lg text-center animate-fade-in">
              <p className="text-sm text-muted-foreground">
                🔒 Paiement 100% sécurisé via Stripe<br />
                Vous recevrez votre billet par email immédiatement après le paiement
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Paiement;
