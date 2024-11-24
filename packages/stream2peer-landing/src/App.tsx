import { About } from "./components/About";
import { FAQ } from "./components/FAQ";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";
import { Community } from "./components/Community";
import { ScrollToTop } from "./components/ScrollToTop";
import { Sponsors } from "./components/Sponsors";
import { Team } from "./components/Team";
// import { Cta } from "./components/Cta";
// import { Testimonials } from "./components/Testimonials";
// import { Services } from "./components/Services";
// import { Pricing } from "./components/Pricing";
import "./App.css";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
