-- Table pour les réservations
CREATE TABLE IF NOT EXISTS public.reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_code text UNIQUE NOT NULL,
  prenom text NOT NULL,
  nom text NOT NULL,
  email text NOT NULL,
  nombre_billets integer NOT NULL CHECK (nombre_billets > 0),
  status text NOT NULL DEFAULT 'pending_payment' CHECK (status IN ('pending_payment', 'confirmed', 'cancelled')),
  presence_status text NOT NULL DEFAULT 'non_arrive' CHECK (presence_status IN ('non_arrive', 'present')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture de toutes les réservations (pour l'admin)
CREATE POLICY "Public can read own reservations" 
  ON public.reservations 
  FOR SELECT 
  USING (true);

-- Politique pour permettre l'insertion de nouvelles réservations
CREATE POLICY "Anyone can create reservations" 
  ON public.reservations 
  FOR INSERT 
  WITH CHECK (true);

-- Politique pour permettre la mise à jour de réservations
CREATE POLICY "Anyone can update reservations" 
  ON public.reservations 
  FOR UPDATE 
  USING (true);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger pour updated_at
CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Index pour améliorer les performances
CREATE INDEX idx_reservations_ticket_code ON public.reservations(ticket_code);
CREATE INDEX idx_reservations_email ON public.reservations(email);
CREATE INDEX idx_reservations_status ON public.reservations(status);
CREATE INDEX idx_reservations_created_at ON public.reservations(created_at DESC);