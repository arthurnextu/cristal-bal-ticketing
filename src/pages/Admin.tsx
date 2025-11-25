import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Lock, Users, Ticket, CheckCircle, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Reservation {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  nombre_billets: number;
  ticket_code: string;
  status: string;
  presence_status: string;
  created_at: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const CAPACITE_TOTALE = 100;

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
      loadReservations();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("admin-verify", {
        body: { password },
      });

      if (error) throw error;

      if (data.success) {
        localStorage.setItem("admin_token", data.token);
        setIsAuthenticated(true);
        loadReservations();
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans l'interface d'administration",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Mot de passe incorrect",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setPassword("");
  };

  const loadReservations = async () => {
    try {
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReservations(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les réservations",
        variant: "destructive",
      });
    }
  };

  const togglePresence = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "present" ? "non_arrive" : "present";

    try {
      const { error } = await supabase
        .from("reservations")
        .update({ presence_status: newStatus })
        .eq("id", id);

      if (error) throw error;

      loadReservations();
      toast({
        title: "Statut mis à jour",
        description: `Présence ${newStatus === "present" ? "confirmée" : "annulée"}`,
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md animate-fade-in">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Lock className="w-6 h-6 text-accent" />
              Administration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Mot de passe administrateur"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const reservationsConfirmees = reservations.filter((r) => r.status === "confirmed");
  const totalBilletsVendus = reservationsConfirmees.reduce(
    (sum, r) => sum + r.nombre_billets,
    0
  );
  const billetsRestants = CAPACITE_TOTALE - totalBilletsVendus;
  const personnesPresentes = reservations.filter(
    (r) => r.presence_status === "present"
  ).length;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-cormorant font-bold text-accent">
            Administration - Le Bal de cristal
          </h1>
          <Button variant="outline" onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="animate-fade-in">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Réservations</p>
                  <p className="text-2xl font-bold">{reservationsConfirmees.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Ticket className="w-8 h-8 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Billets vendus</p>
                  <p className="text-2xl font-bold">{totalBilletsVendus}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Places restantes</p>
                  <p className="text-2xl font-bold">{billetsRestants}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Présents</p>
                  <p className="text-2xl font-bold">{personnesPresentes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des réservations */}
        <Card className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <CardTitle>Liste des réservations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-center">Billets</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Présence</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-medium">
                        {reservation.prenom} {reservation.nom}
                      </TableCell>
                      <TableCell>{reservation.email}</TableCell>
                      <TableCell className="text-center">
                        {reservation.nombre_billets}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {reservation.ticket_code}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            reservation.status === "confirmed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {reservation.status === "confirmed"
                            ? "Confirmé"
                            : "En attente"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            reservation.presence_status === "present"
                              ? "default"
                              : "outline"
                          }
                          className={
                            reservation.presence_status === "present"
                              ? "bg-green-600"
                              : ""
                          }
                        >
                          {reservation.presence_status === "present"
                            ? "Présent"
                            : "Non arrivé"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(reservation.created_at).toLocaleDateString(
                          "fr-FR"
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            togglePresence(
                              reservation.id,
                              reservation.presence_status
                            )
                          }
                        >
                          {reservation.presence_status === "present"
                            ? "Annuler"
                            : "Marquer présent"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
