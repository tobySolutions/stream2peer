import LogoIcon from "/logo.png"

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <a
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex"
          >
            <img src={LogoIcon} className="w-45 h-6 md:h-8 object-cover" />
          </a>
        </div>

        <div
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
          data-aos-delay="50"
          className="flex flex-col gap-2"
        >
          <h3 className="font-bold text-lg">Follow US</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Github
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Twitter
            </a>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
          data-aos-delay="50"
          className="flex flex-col gap-2"
        >
          <h3 className="font-bold text-lg">About</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#features"
              className="opacity-60 hover:opacity-100"
            >
              Features
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#faq"
              className="opacity-60 hover:opacity-100"
            >
              FAQ
            </a>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
          data-aos-delay="50"
          className="flex flex-col gap-2"
        >
          <h3 className="font-bold text-lg">Community</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Youtube
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Discord
            </a>
          </div>
        </div>
      </section>

      <section
        data-aos="fade-zoom-in"
        data-aos-easing="ease-in-back"
        data-aos-delay="600"
        data-aos-offset="0"
        className="container pb-14 text-center"
      >
        <h3>
          &copy; 2024 Landing page made by{" "}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://github.com/tobySolutions/stream2peer"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Stream2Peer
          </a>
        </h3>
      </section>
    </footer>
  );
};
