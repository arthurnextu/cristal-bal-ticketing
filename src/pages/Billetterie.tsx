import { useState } from "react";
import { Layout } from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, Ticket, AlertCircle, Info } from "lucide-react";
import { z } from "zod";

const reservationSchema = z.object({
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères").max(100),
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().email("Email invalide").max(255),
  nombreBillets: z.number().min(1, "Minimum 1 billet").max(10, "Maximum 10 billets"),
});

const Billetterie = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    nombreBillets: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation
      const validated = reservationSchema.parse(formData);

      console.log("Submitting reservation:", validated);

      // Appeler l'edge function pour initialiser la réservation
      const { data, error } = await supabase.functions.invoke("init-reservation", {
        body: validated,
      });

      if (error) {
        console.error("Error from edge function:", error);
        throw new Error(error.message || "Erreur lors de la réservation");
      }

      if (data.error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: data.error,
        });
        setIsLoading(false);
        return;
      }

      console.log("Reservation created:", data);

      // Rediriger vers la page de paiement
      navigate(`/paiement/${data.reservationId}`);
    } catch (error) {
      console.error("Error submitting reservation:", error);
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          variant: "destructive",
          title: "Validation échouée",
          description: firstError.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: error instanceof Error ? error.message : "Une erreur est survenue",
        });
      }
      setIsLoading(false);
    }
  };

  const prixTotal = formData.nombreBillets * 20;

  return (
    <Layout>
      <div className="py-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* En-tête */}
            <div className="text-center mb-12 space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-primary animate-scale-in">
                Réservez vos billets
              </h1>
              <p className="text-lg text-muted-foreground">
                Rejoignez-nous pour une soirée inoubliable
              </p>
            </div>

            {/* Informations de l'événement */}
            <Card className="card-bordered bg-card p-6 mb-8 hover-lift animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold">19 décembre 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Horaires</p>
                    <p className="font-semibold">19h00 - 01h00</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lieu</p>
                    <p className="font-semibold">Maison Cantonale</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Formulaire */}
              <div className="lg:col-span-2">
                <Card className="card-bordered bg-card p-8 hover-lift animate-fade-in">
                  <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                    <Ticket className="h-6 w-6" />
                    Informations de réservation
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="prenom">Prénom *</Label>
                        <Input
                          id="prenom"
                          type="text"
                          value={formData.prenom}
                          onChange={(e) =>
                            setFormData({ ...formData, prenom: e.target.value })
                          }
                          placeholder="Votre prénom"
                          required
                          disabled={isLoading}
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nom">Nom *</Label>
                        <Input
                          id="nom"
                          type="text"
                          value={formData.nom}
                          onChange={(e) =>
                            setFormData({ ...formData, nom: e.target.value })
                          }
                          placeholder="Votre nom"
                          required
                          disabled={isLoading}
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Adresse email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="votre.email@exemple.com"
                        required
                        disabled={isLoading}
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                      />
                      <p className="text-xs text-muted-foreground">
                        Votre billet sera envoyé à cette adresse
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nombreBillets">Nombre de billets *</Label>
                      <Input
                        id="nombreBillets"
                        type="number"
                        min="1"
                        max="10"
                        value={formData.nombreBillets}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nombreBillets: parseInt(e.target.value) || 1,
                          })
                        }
                        required
                        disabled={isLoading}
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                      />
                      <p className="text-xs text-muted-foreground">
                        Maximum 10 billets par réservation
                      </p>
                    </div>

                    <div className="pt-6">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg py-6 btn-christmas"
                      >
                        {isLoading ? (
                          "Réservation en cours..."
                        ) : (
                          <>
                            Réserver pour {prixTotal}€
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>

              {/* Récapitulatif */}
              <div className="space-y-6">
                <Card className="card-bordered bg-secondary/10 p-6 hover-lift animate-fade-in">
                  <h3 className="text-xl font-bold text-primary mb-4">Récapitulatif</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Prix unitaire</span>
                      <span className="font-semibold">20€</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Nombre de billets</span>
                      <span className="font-semibold">{formData.nombreBillets}</span>
                    </div>
                    <div className="border-t border-card-border pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-2xl font-bold text-primary">
                          {prixTotal}€
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="card-bordered bg-card p-6 hover-lift animate-fade-in">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>
                        <strong className="text-foreground">Billetterie ouverte</strong>
                        <br />
                        Du 28 novembre au 12 décembre 2025
                      </p>
                      <p>
                        <strong className="text-foreground">Places limitées</strong>
                        <br />
                        Seulement 100 billets disponibles
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="card-bordered bg-card p-6 hover-lift animate-fade-in">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>
                        <strong className="text-foreground">Paiement sécurisé</strong>
                        <br />
                        Votre paiement est sécurisé via Stripe
                      </p>
                      <p>
                        <strong className="text-foreground">Confirmation immédiate</strong>
                        <br />
                        Recevez votre billet par email instantanément
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Informations légales */}
            <div className="mt-8 p-6 bg-muted/50 rounded-lg text-center animate-fade-in">
              <p className="text-sm text-muted-foreground">
                En réservant, vous acceptez nos{" "}
                <a href="/cgv" className="text-primary hover:underline">
                  Conditions Générales de Vente
                </a>{" "}
                et notre{" "}
                <a href="/politique-remboursement" className="text-primary hover:underline">
                  Politique de remboursement
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Billetterie;
