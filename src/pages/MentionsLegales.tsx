import { Layout } from "@/components/Layout/Layout";

const MentionsLegales = () => {
  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">
              Mentions légales
            </h1>

            <div className="prose prose-lg max-w-none space-y-8 text-foreground">
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">1. Éditeur du site</h2>
                <div className="text-muted-foreground space-y-2">
                  <p>
                    <strong className="text-foreground">Raison sociale :</strong> Mairie de Bordeaux<br />
                    <strong className="text-foreground">Adresse :</strong> Place Pey Berland, 33000 Bordeaux, France<br />
                    <strong className="text-foreground">Téléphone :</strong> 05 56 10 20 30<br />
                    <strong className="text-foreground">Email :</strong> infomairie@mairie-bordeaux.fr
                  </p>
                  <p>
                    <strong className="text-foreground">Directeur de la publication :</strong> [Nom du Maire]<br />
                    <strong className="text-foreground">Responsable éditorial :</strong> Service Communication de la Mairie
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">2. Hébergeur</h2>
                <div className="text-muted-foreground space-y-2">
                  <p>
                    Le site est hébergé par :<br />
                    <strong className="text-foreground">Lovable</strong><br />
                    Service d'hébergement web<br />
                    https://lovable.dev
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">3. Propriété intellectuelle</h2>
                <p className="text-muted-foreground">
                  L'ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes, etc.) est la propriété 
                  exclusive de la Mairie de Bordeaux ou fait l'objet d'une autorisation d'utilisation. Toute reproduction, 
                  représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que 
                  soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de la Mairie de Bordeaux.
                </p>
                <p className="text-muted-foreground mt-4">
                  Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée 
                  comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et 
                  suivants du Code de Propriété Intellectuelle.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">4. Données personnelles</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    <strong className="text-foreground">Responsable du traitement :</strong><br />
                    La Mairie de Bordeaux est responsable du traitement des données personnelles collectées sur ce site.
                  </p>
                  <p>
                    <strong className="text-foreground">Données collectées :</strong><br />
                    Lors de la réservation de billets, nous collectons les données suivantes :
                  </p>
                  <ul className="list-disc list-inside ml-4">
                    <li>Nom et prénom</li>
                    <li>Adresse email</li>
                    <li>Nombre de billets réservés</li>
                    <li>Données de paiement (traitées de manière sécurisée par Stripe)</li>
                  </ul>
                  <p>
                    <strong className="text-foreground">Finalité du traitement :</strong><br />
                    Les données sont collectées dans le but unique de gérer les réservations pour l'événement 
                    "Le Bal de cristal", d'envoyer les billets électroniques et de communiquer les informations 
                    relatives à l'événement.
                  </p>
                  <p>
                    <strong className="text-foreground">Conservation des données :</strong><br />
                    Les données personnelles sont conservées pendant la durée nécessaire à la gestion de l'événement 
                    et pendant un délai de 12 mois suivant la date de l'événement, sauf obligation légale de conservation 
                    plus longue.
                  </p>
                  <p>
                    <strong className="text-foreground">Vos droits :</strong><br />
                    Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit 
                    d'accès, de rectification, de suppression, de limitation du traitement, d'opposition et de portabilité 
                    de vos données personnelles.
                  </p>
                  <p>
                    Pour exercer ces droits, contactez-nous à l'adresse : 
                    <a href="mailto:infomairie@mairie-bordeaux.fr" className="text-primary hover:underline ml-1">
                      infomairie@mairie-bordeaux.fr
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">5. Cookies</h2>
                <p className="text-muted-foreground">
                  Ce site utilise des cookies strictement nécessaires au fonctionnement du site et à la gestion des 
                  réservations. Ces cookies ne collectent aucune donnée personnelle et ne nécessitent pas de consentement 
                  préalable. Aucun cookie de tracking ou de publicité n'est utilisé sur ce site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">6. Limitation de responsabilité</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    La Mairie de Bordeaux s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées 
                    sur ce site. Toutefois, elle ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations 
                    mises à disposition sur ce site.
                  </p>
                  <p>
                    La Mairie de Bordeaux ne saurait être tenue responsable :
                  </p>
                  <ul className="list-disc list-inside ml-4">
                    <li>Des interruptions temporaires du site pour des raisons de maintenance ou de force majeure</li>
                    <li>Des dommages directs ou indirects résultant de l'accès ou de l'utilisation du site</li>
                    <li>Des virus, erreurs, bugs ou défaillances techniques</li>
                    <li>De l'utilisation frauduleuse des billets par des tiers</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">7. Liens hypertextes</h2>
                <p className="text-muted-foreground">
                  Ce site peut contenir des liens vers d'autres sites internet. La Mairie de Bordeaux n'exerce aucun 
                  contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">8. Droit applicable</h2>
                <p className="text-muted-foreground">
                  Les présentes mentions légales sont soumises au droit français. En cas de litige et à défaut de résolution 
                  amiable, les tribunaux français seront seuls compétents.
                </p>
              </section>

              <div className="mt-12 p-6 bg-accent/20 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Dernière mise à jour :</strong> Novembre 2025<br />
                  <strong>Contact :</strong> <a href="mailto:infomairie@mairie-bordeaux.fr" className="text-primary hover:underline">infomairie@mairie-bordeaux.fr</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MentionsLegales;
