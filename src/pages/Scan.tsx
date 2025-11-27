import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Camera, CheckCircle, XCircle, AlertCircle, Ticket } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ScanResult {
  success: boolean;
  message: string;
  reservation?: {
    prenom: string;
    nom: string;
    nombre_billets: number;
  };
  alreadyScanned?: boolean;
}

const Scan = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [html5QrCode, setHtml5QrCode] = useState<Html5Qrcode | null>(null);
  const { toast } = useToast();
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (html5QrCode && isScanning) {
        html5QrCode.stop().catch(console.error);
      }
    };
  }, [html5QrCode, isScanning]);

  const startScanning = async () => {
    try {
      const qrCodeScanner = new Html5Qrcode("qr-reader");
      setHtml5QrCode(qrCodeScanner);

      await qrCodeScanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        onScanSuccess,
        () => {} // onScanFailure - ignore
      );

      setIsScanning(true);
      setScanResult(null);
    } catch (err) {
      console.error("Error starting scanner:", err);
      toast({
        title: "Erreur",
        description: "Impossible d'accéder à la caméra",
        variant: "destructive",
      });
    }
  };

  const stopScanning = async () => {
    if (html5QrCode && isScanning) {
      try {
        await html5QrCode.stop();
        setIsScanning(false);
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
  };

  const onScanSuccess = async (decodedText: string) => {
    // Arrêter le scan temporairement
    await stopScanning();

    // Extraire le ticketCode de l'URL ou utiliser directement le texte
    let ticketCode = decodedText;
    if (decodedText.includes("/check/")) {
      ticketCode = decodedText.split("/check/")[1];
    }

    try {
      const { data, error } = await supabase.functions.invoke("check-in", {
        body: { ticketCode },
      });

      if (error) throw error;

      if (data.valid) {
        setScanResult({
          success: true,
          message: "Billet valide !",
          reservation: data.reservation,
          alreadyScanned: false,
        });

        toast({
          title: "✓ Billet valide",
          description: `${data.reservation.prenom} ${data.reservation.nom} - ${data.reservation.nombre_billets} billet(s)`,
        });
      } else if (data.alreadyScanned) {
        setScanResult({
          success: false,
          message: "Billet déjà scanné",
          reservation: data.reservation,
          alreadyScanned: true,
        });

        toast({
          title: "⚠ Déjà scanné",
          description: `Ce billet a déjà été vérifié`,
          variant: "destructive",
        });
      } else {
        setScanResult({
          success: false,
          message: data.message || "Billet invalide",
        });

        toast({
          title: "✗ Billet invalide",
          description: "Ce code ne correspond à aucune réservation",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Check-in error:", error);
      setScanResult({
        success: false,
        message: "Erreur lors de la vérification",
      });

      toast({
        title: "Erreur",
        description: "Impossible de vérifier le billet",
        variant: "destructive",
      });
    }

    // Redémarrer le scan après 3 secondes
    setTimeout(() => {
      setScanResult(null);
      startScanning();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Camera className="w-6 h-6 text-accent" />
              Scanner les billets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Zone de scan */}
            <div className="relative">
              <div
                id="qr-reader"
                ref={scannerRef}
                className="rounded-lg overflow-hidden border-2 border-border"
              />
              {!isScanning && !scanResult && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/90 rounded-lg">
                  <div className="text-center space-y-4">
                    <Camera className="w-16 h-16 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">
                      Cliquez pour activer la caméra
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bouton de contrôle */}
            <Button
              onClick={isScanning ? stopScanning : startScanning}
              className="w-full"
              size="lg"
            >
              {isScanning ? "Arrêter le scan" : "Démarrer le scan"}
            </Button>

            {/* Résultat du scan */}
            {scanResult && (
              <Alert
                className={`animate-scale-in ${
                  scanResult.success
                    ? "border-green-500 bg-green-50 dark:bg-green-950"
                    : scanResult.alreadyScanned
                    ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950"
                    : "border-red-500 bg-red-50 dark:bg-red-950"
                }`}
              >
                {scanResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : scanResult.alreadyScanned ? (
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="font-bold text-lg">{scanResult.message}</p>
                    {scanResult.reservation && (
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Nom :</strong> {scanResult.reservation.prenom}{" "}
                          {scanResult.reservation.nom}
                        </p>
                        <p className="flex items-center gap-2">
                          <Ticket className="w-4 h-4" />
                          <strong>Billets :</strong>{" "}
                          {scanResult.reservation.nombre_billets}
                        </p>
                      </div>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Instructions */}
            <div className="text-sm text-muted-foreground space-y-2 bg-muted/50 p-4 rounded-lg">
              <p className="font-semibold">Instructions :</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Pointez la caméra vers le QR code du billet</li>
                <li>Le scan se fait automatiquement</li>
                <li>Vérifiez le nom et le nombre de billets</li>
                <li>
                  Un billet valide sera marqué comme "Présent" dans le système
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Scan;
