import { Layout } from "@/components/Layout/Layout";

const CGV = () => {
  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">
              Conditions Générales de Vente
            </h1>

            <div className="prose prose-lg max-w-none space-y-8 text-foreground">
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">1. Objet</h2>
                <p className="text-muted-foreground">
                  Les présentes Conditions Générales de Vente (CGV) régissent la vente de billets pour l'événement 
                  "Le Bal de cristal" organisé par la Mairie de Bordeaux le 19 décembre 2025 à la Maison Cantonale, 
                  quartier La Bastide, Bordeaux.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">2. Description de l'événement</h2>
                <p className="text-muted-foreground mb-2">
                  <strong>Événement :</strong> Le Bal de cristal (bal de Noël)<br />
                  <strong>Date :</strong> 19 décembre 2025<br />
                  <strong>Horaires :</strong> 19h00 - 01h00 (ouverture du bal à 21h30)<br />
                  <strong>Lieu :</strong> Maison Cantonale, quartier La Bastide, Bordeaux<br />
                  <strong>Capacité :</strong> 100 places maximum<br />
                  <strong>Dress code :</strong> Tenue élégante aux couleurs vert, rouge et blanc
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">3. Prix</h2>
                <p className="text-muted-foreground">
                  Le prix du billet est fixé à 20€ par personne. Ce tarif inclut l'accès à l'événement, 
                  le cocktail de bienvenue, le buffet gastronomique et l'ensemble des animations proposées 
                  durant la soirée.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">4. Modalités de réservation</h2>
                <p className="text-muted-foreground">
                  La billetterie est ouverte du 28 novembre 2025 au 12 décembre 2025. Les réservations 
                  s'effectuent exclusivement en ligne via le site web de l'événement. Chaque personne peut 
                  réserver plusieurs billets dans la limite des places disponibles.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">5. Modalités de paiement</h2>
                <p className="text-muted-foreground">
                  Le paiement s'effectue en ligne par carte bancaire via la plateforme sécurisée Stripe. 
                  La réservation n'est confirmée qu'après validation du paiement. Un email de confirmation 
                  contenant le billet électronique avec QR code est envoyé à l'adresse email renseignée lors 
                  de la réservation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">6. Confirmation de la commande</h2>
                <p className="text-muted-foreground">
                  Après validation du paiement, un email de confirmation est automatiquement envoyé contenant :
                </p>
                <ul className="list-disc list-inside text-muted-foreground ml-4">
                  <li>Le billet électronique au format PDF</li>
                  <li>Un QR code unique par réservation</li>
                  <li>Le récapitulatif de la commande</li>
                  <li>Les informations pratiques de l'événement</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">7. Capacité et refus de vente</h2>
                <p className="text-muted-foreground">
                  La capacité de l'événement est limitée à 100 places. L'organisateur se réserve le droit 
                  de refuser toute commande en cas de dépassement de cette capacité. En cas d'impossibilité 
                  de confirmer une réservation, le montant payé sera intégralement remboursé.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">8. Annulation / Modification de l'événement</h2>
                <p className="text-muted-foreground">
                  En cas d'annulation de l'événement par l'organisateur, les participants seront informés 
                  par email et se verront proposer soit un report de la date, soit un remboursement intégral 
                  du prix du billet. En cas de modification des conditions de l'événement (date, lieu, programme), 
                  les participants en seront informés dans les meilleurs délais.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">9. Responsabilité de l'organisateur</h2>
                <p className="text-muted-foreground">
                  L'organisateur s'engage à mettre en œuvre tous les moyens nécessaires pour assurer le bon 
                  déroulement de l'événement. Toutefois, sa responsabilité ne saurait être engagée en cas de 
                  force majeure, d'impossibilité d'accès au lieu de l'événement, ou de tout autre événement 
                  indépendant de sa volonté. L'organisateur ne saurait être tenu responsable des vols, pertes 
                  ou dommages survenus pendant l'événement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">10. Force majeure</h2>
                <p className="text-muted-foreground">
                  En cas de force majeure (catastrophe naturelle, épidémie, décision gouvernementale, etc.) 
                  rendant impossible la tenue de l'événement, l'organisateur en informera les participants 
                  et proposera soit un report, soit un remboursement des billets.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">11. Droit applicable et juridiction compétente</h2>
                <p className="text-muted-foreground">
                  Les présentes CGV sont soumises au droit français. En cas de litige et à défaut de résolution 
                  amiable, le tribunal compétent sera celui du ressort de Bordeaux.
                </p>
              </section>

              <div className="mt-12 p-6 bg-accent/20 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Dernière mise à jour :</strong> Novembre 2025<br />
                  <strong>Organisateur :</strong> Mairie de Bordeaux<br />
                  <strong>Contact :</strong> infomairie@mairie-bordeaux.fr - 05 56 10 20 30
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CGV;
