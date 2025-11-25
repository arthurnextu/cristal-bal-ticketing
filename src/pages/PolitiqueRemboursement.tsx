import { Layout } from "@/components/Layout/Layout";

const PolitiqueRemboursement = () => {
  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">
              Politique de remboursement
            </h1>

            <div className="prose prose-lg max-w-none space-y-8 text-foreground">
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Conditions générales de remboursement</h2>
                <p className="text-muted-foreground">
                  Cette politique de remboursement s'applique à tous les billets achetés pour l'événement 
                  "Le Bal de cristal" organisé le 19 décembre 2025 par la Mairie de Bordeaux.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">1. Remboursement à l'initiative du participant</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Délai de rétractation :</strong><br />
                    Conformément à la réglementation en vigueur, le participant dispose d'un délai de 14 jours 
                    à compter de la date d'achat pour exercer son droit de rétractation et demander le remboursement 
                    intégral de son billet.
                  </p>
                  <p>
                    <strong className="text-foreground">Après le délai de rétractation :</strong><br />
                    Passé ce délai et jusqu'à 7 jours avant l'événement, une demande de remboursement peut être 
                    acceptée sous réserve de justificatif valable (maladie, décès d'un proche, cas de force majeure). 
                    Dans ce cas, des frais de gestion de 5€ par billet seront retenus.
                  </p>
                  <p>
                    <strong className="text-foreground">Moins de 7 jours avant l'événement :</strong><br />
                    Aucun remboursement ne sera possible dans les 7 jours précédant l'événement, sauf en cas 
                    d'annulation de l'événement par l'organisateur.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">2. Remboursement à l'initiative de l'organisateur</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Annulation de l'événement :</strong><br />
                    En cas d'annulation de l'événement par l'organisateur, tous les participants seront intégralement 
                    remboursés du prix de leur billet dans un délai de 30 jours maximum suivant l'annonce officielle. 
                    Le remboursement s'effectuera automatiquement sur le moyen de paiement utilisé lors de l'achat.
                  </p>
                  <p>
                    <strong className="text-foreground">Modification majeure :</strong><br />
                    En cas de modification substantielle de l'événement (changement de date, de lieu, du programme) 
                    qui ne conviendrait pas au participant, celui-ci pourra demander le remboursement intégral 
                    de son billet dans un délai de 7 jours suivant l'annonce de la modification.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">3. Cas de non-remboursement</h2>
                <p className="text-muted-foreground mb-4">
                  Aucun remboursement ne sera effectué dans les cas suivants :
                </p>
                <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-2">
                  <li>Non-présentation à l'événement (« no-show ») sans justificatif valable</li>
                  <li>Arrivée tardive après la fermeture des portes</li>
                  <li>Refus d'accès dû au non-respect du dress code après avertissement</li>
                  <li>Exclusion de l'événement pour comportement inapproprié</li>
                  <li>Perte ou oubli du billet électronique (un duplicata peut être fourni gratuitement)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">4. Procédure de demande de remboursement</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Pour demander un remboursement, le participant doit :
                  </p>
                  <ol className="list-decimal list-inside ml-4 space-y-2">
                    <li>Envoyer un email à <a href="mailto:infomairie@mairie-bordeaux.fr" className="text-primary hover:underline">infomairie@mairie-bordeaux.fr</a></li>
                    <li>Indiquer en objet : "Demande de remboursement - Le Bal de cristal"</li>
                    <li>Préciser le nom, prénom, email et numéro de billet</li>
                    <li>Joindre le justificatif si nécessaire</li>
                  </ol>
                  <p className="mt-4">
                    La demande sera traitée dans un délai de 5 jours ouvrés. En cas d'acceptation, 
                    le remboursement sera effectué dans un délai de 14 jours maximum.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">5. Modalités de remboursement</h2>
                <p className="text-muted-foreground">
                  Le remboursement s'effectue automatiquement sur le moyen de paiement utilisé lors de l'achat 
                  (carte bancaire). Le délai de traitement bancaire peut varier de 3 à 10 jours ouvrés selon 
                  les établissements bancaires.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">6. Transfert de billet</h2>
                <p className="text-muted-foreground">
                  Si vous ne pouvez pas assister à l'événement mais ne souhaitez pas demander de remboursement, 
                  vous avez la possibilité de transférer votre billet à une autre personne. Pour cela, contactez 
                  l'organisateur par email en précisant les coordonnées de la nouvelle personne.
                </p>
              </section>

              <div className="mt-12 p-6 bg-accent/20 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Contact pour toute demande :</strong><br />
                  Email : <a href="mailto:infomairie@mairie-bordeaux.fr" className="text-primary hover:underline">infomairie@mairie-bordeaux.fr</a><br />
                  Téléphone : <a href="tel:0556102030" className="text-primary hover:underline">05 56 10 20 30</a><br />
                  Horaires : Du lundi au vendredi, 9h00 - 17h00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PolitiqueRemboursement;
