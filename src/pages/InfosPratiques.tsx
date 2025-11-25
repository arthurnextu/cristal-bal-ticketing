import { Layout } from "@/components/Layout/Layout";
import { MapPin, Clock, Mail, Phone, Shirt, Info } from "lucide-react";

const InfosPratiques = () => {
  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-primary">
                Informations pratiques
              </h1>
              <p className="text-lg text-muted-foreground">
                Tout ce que vous devez savoir pour profiter pleinement de la soirée
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Lieu */}
              <div className="card-bordered bg-card p-6 rounded-lg hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-primary">Lieu</h3>
                    <p className="text-muted-foreground">
                      Maison Cantonale<br />
                      Quartier La Bastide<br />
                      Bordeaux
                    </p>
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground text-center">
                        [Carte Google Maps sera intégrée ici]
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horaires */}
              <div className="card-bordered bg-card p-6 rounded-lg hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-primary">Horaires</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong>Ouverture des portes :</strong> 19h00</p>
                      <p><strong>Ouverture du bal :</strong> 21h30</p>
                      <p><strong>Clôture :</strong> 01h00</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      19 décembre 2025
                    </p>
                  </div>
                </div>
              </div>

              {/* Dress code */}
              <div className="card-bordered bg-card p-6 rounded-lg hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Shirt className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-primary">Dress code</h3>
                    <p className="text-muted-foreground mb-4">
                      Tenue de soirée élégante aux couleurs de Noël
                    </p>
                    <div className="flex gap-3">
                      <div className="flex-1 p-3 rounded-lg bg-green-100 dark:bg-green-900/20 text-center">
                        <div className="w-8 h-8 rounded-full bg-green-600 mx-auto mb-2"></div>
                        <p className="text-sm font-medium">Vert</p>
                      </div>
                      <div className="flex-1 p-3 rounded-lg bg-red-100 dark:bg-red-900/20 text-center">
                        <div className="w-8 h-8 rounded-full bg-red-600 mx-auto mb-2"></div>
                        <p className="text-sm font-medium">Rouge</p>
                      </div>
                      <div className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-center">
                        <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 mx-auto mb-2"></div>
                        <p className="text-sm font-medium">Blanc</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations importantes */}
              <div className="card-bordered bg-card p-6 rounded-lg hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Info className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-primary">À savoir</h3>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• Vestiaire disponible à l'entrée</li>
                      <li>• Cocktail de bienvenue offert</li>
                      <li>• Buffet gastronomique inclus</li>
                      <li>• Photobooth gratuit toute la soirée</li>
                      <li>• Tombola avec cadeaux à gagner</li>
                      <li>• Prix : 20€ par billet</li>
                      <li>• Capacité limitée à 100 places</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-12 card-bordered bg-secondary/10 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-6 text-center">
                Besoin d'informations ?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Téléphone</p>
                    <a href="tel:0556102030" className="font-medium hover:text-primary transition-colors">
                      05 56 10 20 30
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:infomairie@mairie-bordeaux.fr" className="font-medium hover:text-primary transition-colors break-all">
                      infomairie@mairie-bordeaux.fr
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InfosPratiques;
