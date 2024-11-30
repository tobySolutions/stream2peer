import { Hero } from "../../lib/components/Hero";
import { About } from "../../lib/components/About";
import { HowItWorks } from "../../lib/components/HowItWorks";
import { Features } from "../../lib/components/Features";
import { Team } from "../../lib/components/Team";
import { Community } from "../../lib/components/Community";
import { Sponsors } from "../../lib/components/Sponsors";
import { FAQ } from "../../lib/components/FAQ";
import Layout from "../Layout";

function Home() {
  return (
    <>
      <Layout>
        {/* <ReactLenis root options={{ lerp:0.2 }}> */}

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

        {/* </ReactLenis> */}
      </Layout>
    </>
  );
}

export default Home;
