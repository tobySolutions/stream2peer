import { useEffect, useState } from "react";
import AnimatedCursor from "react-animated-cursor";
import AOS from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";
import { Navbar } from "../../lib/components/Navbar";
import { Hero } from "../../lib/components/Hero";
import { About } from "../../lib/components/About";
import { HowItWorks } from "../../lib/components/HowItWorks";
import { Features } from "../../lib/components/Features";
import { Team } from "../../lib/components/Team";
import { Community } from "../../lib/components/Community";
import { Sponsors } from "../../lib/components/Sponsors";
import { FAQ } from "../../lib/components/FAQ";
import { Footer } from "../../lib/components/Footer";
import { ScrollToTop } from "../../lib/components/ScrollToTop";

function Home() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    const updateCounter = () => {
      setCounter((prev) => {
        if (prev >= 100) return 100;
        const increment = Math.floor(Math.random() * 10) + 1;
        return Math.min(prev + increment, 100);
      });
    };

    const counterInterval = setInterval(
      updateCounter,
      Math.floor(Math.random() * 200) + 50
    );

    return () => clearInterval(counterInterval);
  }, []);

  useEffect(() => {
    if (counter >= 100) {
      const tl = gsap.timeline({
        defaults: { duration: 0.5 },
        onComplete: () => {
          document.body.classList.remove("overflow-hidden");
        },
      });
      tl.to(".counter", { duration: 0.25, delay: 0.5, opacity: 0 });
      tl.to(".bar", {
        duration: 0.5,
        delay: 0.5,
        height: 0,
        stagger: { amount: 1.6 },
        ease: "power4.inOut",
        onComplete: () => {
          document.body.classList.remove("overflow-hidden");
        },
      });
      tl.add(() => {
        const secondTl = gsap.timeline({ defaults: { duration: 1 } });
        secondTl.fromTo(
          "#app-summary",
          { xPercent: -100, opacity: 0 },
          { xPercent: 0, opacity: 1 }
        );
        secondTl.fromTo(
          "#first-card",
          { y: -320, opacity: 0 },
          { y: 0, opacity: 1, ease: "back" },
          "<0.5"
        );
        secondTl.fromTo(
          "#second-card",
          { y: -320, opacity: 0 },
          { y: 0, opacity: 1, ease: "back" },
          "<0.5"
        );
        secondTl.fromTo(
          "#third-card",
          { y: 320, opacity: 0 },
          { y: 0, opacity: 1 },
          "<0.5"
        );
        secondTl.fromTo(
          "#fourth-card",
          { x: 320, opacity: 0 },
          { x: 0, opacity: 1 },
          "<0.5"
        );
      }, "-=1.6");
    }
  }, [counter]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      document.body.classList.remove("overflow-hidden");
    }, 7500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {!isSmallScreen && (
        <AnimatedCursor
          showSystemCursor={true}
          trailingSpeed={20}
          innerSize={10}
          outerSize={20}
          color="34, 197, 94"
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={4}
          clickables={[
            "a",
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            "label[for]",
            "select",
            "textarea",
            "button",
            ".link",
          ]}
        />
      )}
      <div
        className={` ${loading ? "fixed" : "hidden"} top-0 w-screen h-screen bg-transparent z-50`}
      >
        <div className="counter fixed flex items-end justify-end w-full h-full text-black p-2 text-5xl md:text-9xl z-50">
          {counter}%
        </div>
        <div className="overlay fixed flex w-full h-full z-20">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bar w-full h-full bg-primary"></div>
          ))}
        </div>
      </div>
      {/* <ReactLenis root options={{ lerp:0.2 }}> */}

      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <Features />
      {/* <Services /> */}
      {/* <Cta /> */}
      {/* <Testimonials /> */}
      <Team />
      {/* <Pricing /> */}
      <Community />
      <Sponsors />
      <FAQ />
      <Footer />
      <ScrollToTop />
      {/* </ReactLenis> */}
    </>
  );
}

export default Home;
