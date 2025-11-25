import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-card-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-primary mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:0556102030" className="hover:text-primary transition-colors">
                  05 56 10 20 30
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:infomairie@mairie-bordeaux.fr" className="hover:text-primary transition-colors">
                  infomairie@mairie-bordeaux.fr
                </a>
              </div>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-semibold text-primary mb-4">Informations</h3>
            <div className="space-y-2 text-sm">
              <Link to="/cgv" className="block text-muted-foreground hover:text-primary transition-colors">
                Conditions Générales de Vente
              </Link>
              <Link to="/politique-remboursement" className="block text-muted-foreground hover:text-primary transition-colors">
                Politique de remboursement
              </Link>
              <Link to="/mentions-legales" className="block text-muted-foreground hover:text-primary transition-colors">
                Mentions légales
              </Link>
            </div>
          </div>

          {/* À propos */}
          <div>
            <h3 className="font-semibold text-primary mb-4">Le Bal de cristal</h3>
            <p className="text-sm text-muted-foreground">
              Le bal de Noël incontournable de Bordeaux. Une soirée élégante et festive organisée par la Mairie de Bordeaux.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-card-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Mairie de Bordeaux. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
