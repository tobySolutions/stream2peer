import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Linkedin } from "lucide-react";
import { TwitterIcon } from "./Icons";

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: "https://github.com/chibuike-19.png",
    name: "Emmanuel Obiechina",
    position: "Software Engineer and Frontend Lead",
    socialNetworks: [
      {
        name: "Github",
        url: "https://github.com/chibuike-19.png",
      },
      {
        name: "X",
        url: "https://x.com/official__ceo",
      },
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/emmanuelobiechina/",
      },
    ],
  },
  {
    imageUrl: "https://github.com/excellencyjumo.png",
    name: "Adedamola Adejumo",
    position: "Software Engineer and Backend Lead",
    socialNetworks: [
      {
        name: "Github",
        url: "https://github.com/excellencyjumo",
      },
      {
        name: "Linkedin",
        url: "https://linkedin.com/in/excellencyjumo/",
      },
    ],
  },
  {
    imageUrl: "https://github.com/tobySolutions.png",
    name: "Tobiloba Adedeji",
    position: "Software Engineer and Operations Lead",
    socialNetworks: [
      {
        name: "Github",
        url: "https://github.com/tobySolutions.png",
      },
      {
        name: "X",
        url: "https://x.com/toby_solutions",
      },
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/tobiloba-adedeji/",
      },
    ],
  },
];

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;
      case "X":
        return <TwitterIcon />;
      case "Github":
        return <GitHubLogoIcon className="w-5 h-5" />;
    }
  };

  return (
    <section id="team" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          The Awesome{" "}
        </span>
        Team
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground">
        Meet the amazing group of individuals that make Stream2Peer possible.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10">
        {teamList.map(
          ({ imageUrl, name, position, socialNetworks }: TeamProps) => (
            <Card
              key={name}
              className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
            >
              <CardHeader className="mt-8 flex justify-center items-center pb-2">
                <img
                  src={imageUrl}
                  alt={`${name} ${position}`}
                  className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                />
                <CardTitle className="text-center">{name}</CardTitle>
                <CardDescription className="text-primary">
                  {position}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                  <div key={name}>
                    <a
                      rel="noreferrer noopener"
                      href={url}
                      target="_blank"
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      <span className="sr-only">{name} icon</span>
                      {socialIcon(name)}
                    </a>
                  </div>
                ))}
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
