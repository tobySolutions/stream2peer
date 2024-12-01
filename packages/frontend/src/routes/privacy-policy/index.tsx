import Layout from "../Layout";
const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">
          Privacy Policy for Stream2Peer
        </h1>
        <p className="mb-4">
          <strong>Last Updated:</strong> 30/11/2024
        </p>

        <p className="mb-6">
          Stream2Peer ("we," "our," or "us") is committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, disclose,
          and safeguard your information when you use our platform. Please read
          this policy carefully to understand our practices regarding your
          personal data.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Information We Collect
          </h2>
          <h3 className="text-xl font-medium mb-2">
            a. Information You Provide
          </h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Account creation details, such as your name, email address, and
              login credentials (including OAuth).
            </li>
            <li>
              Platform integration details when connecting your streaming
              accounts.
            </li>
          </ul>

          <h3 className="text-xl font-medium mb-2">
            b. Automatically Collected Data
          </h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              IP addresses and device information for optimizing platform
              performance.
            </li>
            <li>
              Usage data, such as the features you use and the streams you
              create.
            </li>
          </ul>

          <h3 className="text-xl font-medium mb-2">c. Third-Party Data</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Information from third-party integrations (e.g., linked streaming
              platforms like YouTube or Twitch).
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Provide, maintain, and improve the functionality of Stream2Peer.
            </li>
            <li>
              Facilitate multi-platform streaming and manage your streams.
            </li>
            <li>Enhance your experience with personalized recommendations.</li>
            <li>Protect against fraudulent or unauthorized access.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Data Sharing and Disclosure
          </h2>
          <p className="mb-4">
            We value your privacy and will never sell your data. However, we may
            share your data under the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>With Your Consent:</strong> For example, sharing your
              stream details with third-party platforms you have integrated.
            </li>
            <li>
              <strong>Service Providers:</strong> With trusted partners who
              assist in platform functionality (e.g., Livepeer for decentralized
              streaming compute).
            </li>
            <li>
              <strong>Legal Requirements:</strong> If required by law or to
              protect our rights.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Data Storage and Security
          </h2>
          <p className="mb-4">
            We implement robust security measures to safeguard your information,
            including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Encryption for sensitive data.</li>
            <li>Secure server hosting on the Livepeer network.</li>
          </ul>
          <p className="mb-4">
            Your data will be stored only as long as necessary for the purposes
            outlined in this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p className="mb-4">
            As a user of Stream2Peer, you have the following rights:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Access and Portability:</strong> Request access to the
              data we store about you.
            </li>
            <li>
              <strong>Modification:</strong> Update your personal information
              through your account settings.
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your data by
              contacting our support team.
            </li>
            <li>
              <strong>Opt-Out:</strong> Choose not to share certain optional
              information.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Cookies and Tracking Technologies
          </h2>
          <p className="mb-4">
            We may use cookies and similar technologies to enhance your
            experience. Cookies help us:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Analyze usage patterns.</li>
            <li>Remember your preferences.</li>
            <li>Improve platform performance.</li>
          </ul>
          <p className="mb-4">
            You can manage or disable cookies in your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Third-Party Links</h2>
          <p className="mb-4">
            Stream2Peer may include links to third-party platforms, such as
            GitHub or YouTube. We are not responsible for the privacy practices
            of these external sites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            8. Updates to This Policy
          </h2>
          <p className="mb-4">
            We may update this Privacy Policy periodically. Any changes will be
            posted on this page with an updated "Last Updated" date. Continued
            use of Stream2Peer signifies your acceptance of these changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p className="mb-4">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </p>
          <p className="mb-2">
            <strong>Email:</strong> adedejitobiloba7@gmail.com
          </p>
          <p className="mb-4">
            <strong>Discord:</strong>{" "}
            <a
              href="https://discord.gg/kcqsbukZ"
              className="text-blue-600 hover:underline"
            >
              Stream2Peer Discord Channel
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Hosting and Accessibility
          </h2>
          <p className="mb-4">
            This Privacy Policy is available on our official homepage, hosted on
            our verified domain, and accessible to all users without requiring a
            login.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
