import { buttonVariants } from "./ui/button";

export const Community = () => {
  return (
    <section
      id="newsletter"
      data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
    >
      <hr className="w-11/12 mx-auto" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          Join our{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Discord
          </span>
        </h3>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
          Connect with us and other streamers like you!
        </p>

        {/* <form
          className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="leomirandadev@gmail.com"
            className="bg-muted/50 dark:bg-muted/80 "
            aria-label="email"
          />
          <Button>Subscribe</Button>
        </form> */}

        <div className="flex w-full justify-center">
          <a
            rel="noreferrer noopener"
            href="https://discord.gg/kcqsbukZ"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Join us on Discord
          </a>
        </div>

        {/* <div className="flex items-center justify-center">
          <iframe
            src="https://discord.com/widget?id=1311548268647551007&theme=dark"
            width="350"
            height="500"
            allowTransparency={true}
            frameBorder="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          ></iframe>
        </div> */}
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};
