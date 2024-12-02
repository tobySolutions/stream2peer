import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Do I have to pay to stream videos on Stream2Peer?",
    answer: "No, not at all. Stream2Peer is completely free to use.",
    value: "item-1",
  },
  {
    question: "Can I record videos and store them on Stream2Peer?",
    answer:
      "Yes, videos and live streams can be recorded and stored on Stream2Peer.",
    value: "item-2",
  },
  {
    question: "Can I open issues on GitHub if I encounter any bugs or issues?",
    answer:
      "Totally! We encourage you to open issues on our GitHub repository if you encounter any bugs or issues.",
    value: "item-3",
  },
  {
    question: "Is Stream2Peer actively being maintained and updated?",
    answer:
      "Yes, the Stream2Peer project is actively being maintained and updated by the amazing team of individuals behind it.",
    value: "item-4",
  },
];

export const FAQ = () => {
  return (
    <section
      data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3> */}
    </section>
  );
};
