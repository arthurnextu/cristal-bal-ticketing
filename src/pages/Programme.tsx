import { Layout } from "@/components/Layout/Layout";
import { Clock } from "lucide-react";

const Programme = () => {
  const timeline = [
    {
      time: "19h00",
      title: "Accueil des invités",
      description: "Vestiaire, cocktail de bienvenue et séance photos",
      highlight: false,
    },
    {
      time: "19h30",
      title: "Ouverture officielle",
      description: "Discours de bienvenue et lancement de la soirée",
      highlight: false,
    },
    {
      time: "20h00",
      title: "Dîner",
      description: "Buffet gastronomique et début de la musique d'ambiance",
      highlight: false,
    },
    {
      time: "21h30",
      title: "Ouverture du bal",
      description: "Première danse et animation DJ",
      highlight: true,
    },
    {
      time: "22h30",
      title: "Animations",
      description: "Photobooth, tombola avec cadeaux à gagner et danse",
      highlight: true,
    },
    {
      time: "00h00",
      title: "Moment slow de Noël",
      description: "Un moment magique pour clôturer cette soirée en beauté",
      highlight: true,
    },
    {
      time: "01h00",
      title: "Clôture de l'événement",
      description: "Fin de la soirée et sortie des invités",
      highlight: false,
    },
  ];

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-primary">
                Programme de la soirée
              </h1>
              <p className="text-lg text-muted-foreground">
                Découvrez le déroulement de cette soirée exceptionnelle
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-card-border md:left-1/2 md:-ml-px" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col md:flex-row gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Time badge */}
                    <div className="md:w-1/2 flex justify-start md:justify-end items-start md:items-center">
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                          item.highlight
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-accent text-accent-foreground"
                        }`}
                      >
                        <Clock className="h-4 w-4" />
                        <span className="font-semibold">{item.time}</span>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="absolute left-8 md:left-1/2 md:-ml-3 w-6 h-6 rounded-full border-4 border-background bg-primary" />

                    {/* Content */}
                    <div className="md:w-1/2 pl-16 md:pl-0">
                      <div
                        className={`card-bordered bg-card p-6 rounded-lg hover-lift ${
                          item.highlight ? "ring-2 ring-secondary" : ""
                        }`}
                      >
                        <h3 className="text-xl font-semibold mb-2 text-primary">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 card-bordered bg-secondary/10 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Moments phares de la soirée
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">21h30</div>
                  <p className="text-sm text-muted-foreground">Ouverture du bal</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">22h30</div>
                  <p className="text-sm text-muted-foreground">Animations & Tombola</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">00h00</div>
                  <p className="text-sm text-muted-foreground">Slow de Noël</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Programme;
