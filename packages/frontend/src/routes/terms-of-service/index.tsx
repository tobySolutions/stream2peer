import Layout from "../Layout";

const TermsOfService = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-4">
          <strong>Effective Date:</strong> 30/11/2024
        </p>
        <p className="mb-6">
          Welcome to <strong>[Your Website/App Name]</strong>. These Terms of
          Service ("Terms") govern your use of our website, services, and
          products (collectively referred to as "Services"). By accessing or
          using our Services, you agree to be bound by these Terms. If you do
          not agree, you may not use our Services.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="mb-4">
            By using our Services, you affirm that you are at least 18 years old
            or have the legal capacity to enter into this agreement. If you are
            using our Services on behalf of an organization, you agree to these
            Terms on behalf of that organization.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these Terms at any time. We will
            notify you of any changes by posting the updated Terms on this page.
            Continued use of our Services after changes take effect constitutes
            acceptance of the updated Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Use of Services</h2>
          <p className="mb-4">You agree to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use the Services only for lawful purposes.</li>
            <li>
              Not engage in any activity that disrupts or interferes with the
              functionality of the Services.
            </li>
            <li>
              Provide accurate and complete information when creating an account
              or making transactions.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Accounts and Responsibilities
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Account Creation:</strong> You may need to create an
              account to access certain features of the Services. You are
              responsible for maintaining the confidentiality of your account
              information.
            </li>
            <li>
              <strong>Prohibited Actions:</strong> You may not share, transfer,
              or sell your account or use someone else’s account without
              permission.
            </li>
          </ul>
        </section>

        {/* <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Payments and Refunds
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Payments made for our products or services are subject to our{" "}
              <a
                href="[Insert Refund Policy Link]"
                className="text-blue-600 hover:underline"
              >
                Refund Policy
              </a>
              .
            </li>
            <li>All fees are non-refundable unless stated otherwise.</li>
          </ul>
        </section> */}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Intellectual Property
          </h2>
          <p className="mb-4">
            All content, trademarks, and materials available on our Services are
            owned by or licensed to us. You may not reproduce, distribute, or
            create derivative works without our explicit permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Third-Party Links</h2>
          <p className="mb-4">
            Our Services may contain links to third-party websites. We are not
            responsible for the content, policies, or practices of these
            third-party websites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Limitation of Liability
          </h2>
          <p className="mb-4">
            To the fullest extent permitted by law,{" "}
            <strong>[Your Business Name]</strong> and its affiliates will not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages arising out of your use of the Services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
          <p className="mb-4">
            We reserve the right to suspend or terminate your access to our
            Services at any time for violation of these Terms or for any other
            reason without notice or liability.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
          <p className="mb-4">
            These Terms are governed by and construed in accordance with the
            laws of <strong>[Your Jurisdiction]</strong>, without regard to its
            conflict of law principles.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            10. Contact Information
          </h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="mb-2">
            <strong>Email:</strong> adedejitobiloba7@gmail.com
          </p>
          <p className="mb-2">
            <strong>Address:</strong> University Of Lagos, off University Road,
            Akoka
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default TermsOfService;
