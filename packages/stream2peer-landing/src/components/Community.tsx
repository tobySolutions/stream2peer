import { buttonVariants } from "./ui/button";

export const Community = () => {
  return (
    <section id="newsletter">
      <hr className="w-11/12 mx-auto" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          Join Our{" "}
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
            href="https://github.com/tobySolutions/stream2peer"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Join us on Discord
          </a>
        </div>
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};
