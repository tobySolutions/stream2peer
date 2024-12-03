import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "../assets/decentralized.png";
import image3 from "../assets/open-source.png";
import image4 from "../assets/community-centric.png";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Community-centric",
    description:
      "Stream2Peer is a community-centric platform that is meant for developers built by developers.",
    image: image4,
  },
  {
    title: "Open source",
    description:
      "All of our code is open-source and available on GitHub for anyone to contribute to.",
    image: image3,
  },
  {
    title: "Decentralized",
    description:
      "Stream2Peer leverages the power of the Livepeer network to provide a decentralized video streaming platform.",
    image: image,
  },
];

const featureList: string[] = [
  "Community-centric",
  "Open-source",
  "Decentralized",
  "Secure",
  "Optimized compute",
];

export const Features = () => {
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          great features
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge variant="secondary" className="text-sm">
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card
            key={title}
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="w-[250px] lg:w-[350px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
