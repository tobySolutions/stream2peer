// import { Statistics } from "./Statistics";
import pilot from "../assets/pilot.png";
import { buttonVariants } from "./ui/button";

export const About = () => {
  return (
    <section data-aos="zoom-in" id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={pilot}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                Stream2peer
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Stream2Peer integrates directly with the Livepeer network,
                utilizing its compute for decentralized, high-quality video
                streaming. It offers creators customizable, niche-sensitive
                broadcasts, cross-platform streaming, and peer-to-peer
                interaction. As an open-source platform, it is easy to set up
                and frees users from reliance on traditional cloud providers
              </p>
            </div>

            {/* <Statistics /> */}
            <a
              rel="noreferrer noopener"
              href="https://github.com/tobySolutions/stream2peer"
              target="_blank"
              className={`w-full md:w-1/3 ${buttonVariants({
                variant: "default",
              })}`}
            >
              Try it
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
