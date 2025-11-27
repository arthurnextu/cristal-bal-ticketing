import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Shirt } from "lucide-react";
import { Layout } from "@/components/Layout/Layout";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
<section className="relative py-20 md:py-32 overflow-hidden">
  {/* Image de fond */}
  <div
    className="absolute inset-0 -z-10 bg-cover bg-center"
    style={{ backgroundImage: "url('/images/hero-bal.png')" }}
  />
  {/* Overlay pour assombrir un peu l'image */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/20 to-background" />

  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <div className="space-y-4 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold text-primary tracking-tight">
          Le Bal de cristal
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Le bal de Noël incontournable de Bordeaux
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 text-foreground animate-fade-in">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <span className="font-medium">19 décembre 2025</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <span className="font-medium">19h00 - 01h00</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="font-medium">Maison Cantonale, La Bastide</span>
        </div>
      </div>

      <div className="space-y-4 animate-scale-in">
        <Link to="/billetterie">
          <Button 
            size="lg" 
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 shadow-elegant hover-lift btn-christmas"
          >
            Réserver mon billet - 40€
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground">
          Places limitées : 200 billets maximum
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Info Cards Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card-bordered bg-background p-6 rounded-lg text-center hover-lift">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Capacité limitée</h3>
              <p className="text-muted-foreground">
                Seulement 200 places disponibles pour garantir une soirée intime et élégante
              </p>
            </div>

            <div className="card-bordered bg-background p-6 rounded-lg text-center hover-lift">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Shirt className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Dress code</h3>
              <p className="text-muted-foreground">
                Tenue de soirée élégante aux couleurs de Noël : vert, rouge et blanc
              </p>
            </div>

            <div className="card-bordered bg-background p-6 rounded-lg text-center hover-lift">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Billetterie</h3>
              <p className="text-muted-foreground">
                Ouverture : 28 novembre 2025<br />
                Fermeture : 12 décembre 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Une soirée magique vous attend
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Plongez dans l'ambiance festive de Noël lors d'une soirée exceptionnelle à la Maison Cantonale. 
              Au programme : cocktail de bienvenue, dîner raffiné, bal avec DJ, animations surprises, 
              photobooth et tombola avec de magnifiques cadeaux à gagner.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              L'ouverture officielle du bal aura lieu à 21h30, suivie d'une soirée dansante jusqu'à minuit 
              avec un moment slow spécial Noël, avant la clôture à 01h00.
            </p>
            <div className="pt-4">
              <Link to="/programme">
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Découvrir le programme complet
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ne manquez pas cette soirée exceptionnelle
            </h2>
            <p className="text-lg opacity-90">
              Les places sont limitées et la billetterie fermera le 12 décembre 2025. 
              Réservez dès maintenant votre place pour Le Bal de cristal !
            </p>
            <Link to="/billetterie">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-background text-foreground hover:bg-background/90 border-background text-lg px-8 py-6"
              >
                Réserver maintenant
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
