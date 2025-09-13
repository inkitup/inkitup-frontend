import React, { useState } from "react";

export default function Footer() {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);

  const openTermsModal = (e) => {
    e.preventDefault();
    setIsTermsModalOpen(true);
  };

  const closeTermsModal = () => {
    setIsTermsModalOpen(false);
  };

  const openPrivacyModal = (e) => {
    e.preventDefault();
    setIsPrivacyModalOpen(true);
  };

  const closePrivacyModal = () => {
    setIsPrivacyModalOpen(false);
  };

  const openReturnModal = (e) => {
    e.preventDefault();
    setIsReturnModalOpen(true);
  };

  const closeReturnModal = () => {
    setIsReturnModalOpen(false);
  };

  return (
    <footer className="bg-indigo-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          {/* Logo and Company Name */}
          <div className="flex flex-col items-center mb-6 md:mb-0">
            <img
              className="h-12 w-auto mb-2 border-2 rounded-full border-indigo-500"
              src="./logo.png"
              alt="Ink It Up Logo"
            />
            <span className="text-xl font-bold text-white">Ink It Up</span>
          </div>

          <div className="grid grid-cols-3 text-center md:gap-x-12 md:text-left">
            <p
              className="text-sm hover:text-white cursor-pointer"
              onClick={openTermsModal}
            >
              Terms and Conditions
            </p>
            <p
              className="text-sm hover:text-white cursor-pointer"
              onClick={openPrivacyModal}
            >
              Privacy Policy
            </p>
            <p
              className="text-sm hover:text-white cursor-pointer"
              onClick={openReturnModal}
            >
              Return Policy
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-white-700 pt-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Ink It Up. All rights reserved.
          </p>
        </div>
      </div>

      {isTermsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-screen overflow-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-indigo-700 text-white">
              <h2 className="text-xl font-bold">Terms and Conditions</h2>
              <button
                onClick={closeTermsModal}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6 text-gray-800 text-sm">
              <p className="mb-4">
                <strong>
                  By accessing and using this website or placing an order with
                  Ink It Up Printing, you agree to be bound by the following
                  Terms & Conditions. Please read them carefully before using
                  our services.
                </strong>
              </p>

              <section className="mb-4">
                <h3 className="font-bold mb-1">1. Custom Orders</h3>
                <p>
                  All products sold by Ink It Up Printing are custom-made based
                  on the information provided by the customer. It is your
                  responsibility to ensure that all details submitted (designs,
                  sizes, quantities, shipping information) are accurate.
                </p>
                <p>
                  We are not responsible for errors resulting from incorrect
                  information submitted during the order process.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="font-bold mb-1">
                  2. No Cancellations or Returns
                </h3>
                <p>
                  Due to the customized nature of our products, all sales are
                  final. We do not accept cancellations, returns, or exchanges
                  unless the item you receive is defective or damaged. Please
                  refer to our Return Policy for details.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="font-bold mb-1">3. Turnaround & Shipping</h3>
                <p>
                  We strive to print and ship orders in a timely manner.
                  However, turnaround times may vary based on order volume,
                  design complexity, and shipping location. Ink It Up Printing
                  is not responsible for delays caused by third-party carriers
                  or events beyond our control (e.g., weather, strikes, customs
                  delays).
                </p>
              </section>

              <section className="mb-4">
                <h3 className="font-bold mb-1">4. Intellectual Property</h3>
                <p>
                  By uploading or submitting any design, logo, or image to us,
                  you confirm that:
                </p>
                <ul className="list-disc ml-6 mt-1 mb-1">
                  <li>
                    You either own the rights to the artwork or have permission
                    to use it.
                  </li>
                  <li>
                    Your design does not infringe on any trademarks, copyrights,
                    or intellectual property rights of others.
                  </li>
                </ul>
                <p>
                  Ink It Up Printing reserves the right to reject any design
                  that contains offensive, illegal, or infringing content.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="font-bold mb-1">5. Colors & Print Output</h3>
                <p>
                  We strive to match print colors as closely as possible to your
                  submitted design. However, due to screen variations and fabric
                  differences, colors may not appear exactly as they do on
                  digital displays. Slight variations are normal and not
                  considered defects.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="font-bold mb-1">6. Limitation of Liability</h3>
                <p>
                  Ink It Up Printing will not be held liable for any indirect,
                  incidental, or consequential damages that result from the use
                  or inability to use our products or services. Our total
                  liability is limited to the purchase price of the product.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="font-bold mb-1">7. Modifications to Terms</h3>
                <p>
                  We may update or modify these Terms & Conditions at any time
                  without prior notice. It is your responsibility to review this
                  page periodically. Continued use of our site or services after
                  any updates constitutes acceptance of the revised terms.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="font-bold mb-1">8. Governing Law</h3>
                <p>
                  These Terms & Conditions shall be governed and interpreted in
                  accordance with the laws of the jurisdiction in which Ink It
                  Up Printing operates.
                </p>
              </section>

              <section>
                <h3 className="font-bold mb-1">Contact Us</h3>
                <p>
                  <strong>
                    If you have any questions about these Terms & Conditions,
                    please contact us at: 📧 support@inkitupprinting.com
                  </strong>
                </p>
              </section>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={closeTermsModal}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-screen overflow-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-indigo-700 text-white">
              <h2 className="text-xl font-bold">Privacy Policy</h2>
              <button
                onClick={closePrivacyModal}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6 text-gray-800 text-sm">
              <p className="mb-4">
                <strong>
                  At Ink It Up Printing, we respect your privacy and are
                  committed to protecting your personal information. This
                  Privacy Policy outlines how we collect, use, disclose, and
                  safeguard your information when you visit our website or make
                  a purchase.
                </strong>
              </p>

              <section className="mb-4">
                <h3 className="font-bold mb-1">1. Information We Collect</h3>
                <p>We may collect the following types of information:</p>
                <ul className="list-disc ml-6 mt-1 mb-1">
                  <li>
                    <strong>Personal Information:</strong> Name, email address,
                    phone number, shipping and billing address, payment details,
                    and any other information you provide when placing an order
                    or contacting us.
                  </li>
                  <li>
                    <strong>Order Information:</strong> Details about your
                    purchases, order history, and product preferences.
                  </li>
                  <li>
                    <strong>Device Information:</strong> IP address, browser
                    type, operating system, referring URLs, and usage data
                    through cookies and similar tracking technologies.
                  </li>
                </ul>
              </section>

              <section className="mb-4">
                <h3 className="font-bold mb-1">
                  2. How We Use Your Information
                </h3>
                <p>We use your information to:</p>
                <ul className="list-disc ml-6 mt-1 mb-1">
                  <li>Process and fulfill orders</li>
                  <li>Communicate with you about your orders or inquiries</li>
                  <li>Provide customer support and improve service</li>
                  <li>
                    Send updates, promotions, and marketing emails (only if you
                    opt-in)
                  </li>
                  <li>Comply with legal obligations and prevent fraud</li>
                </ul>
              </section>

              <section className="mb-4">
                <h3 className="font-bold mb-1">3. Sharing Your Information</h3>
                <p>
                  We do not sell or rent your personal information. We may share
                  it with:
                </p>
                <ul className="list-disc ml-6 mt-1 mb-1">
                  <li>
                    <strong>Service Providers:</strong> Such as payment
                    processors, shipping companies, and email marketing tools to
                    fulfill your order and provide services.
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> If required by law or
                    to protect our rights.
                  </li>
                </ul>
              </section>

              <section className="mb-4">
                <h3 className="font-bold mb-1">
                  4. Cookies and Tracking Technologies
                </h3>
                <p>
                  We use cookies to enhance your browsing experience, remember
                  your preferences, and analyze site traffic. You can adjust
                  your browser settings to disable cookies, but some features of
                  our site may not work properly.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="font-bold mb-1">5. Data Security</h3>
                <p>
                  We implement appropriate security measures to protect your
                  information from unauthorized access, alteration, disclosure,
                  or destruction. However, no method of transmission over the
                  internet is 100% secure.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="font-bold mb-1">6. Your Rights</h3>
                <p>You have the right to:</p>
                <ul className="list-disc ml-6 mt-1 mb-1">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data</li>
                  <li>Withdraw consent for marketing communications</li>
                  <li>Contact us with any privacy-related concerns</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at:
                  support@inkitupprinting.com
                </p>
              </section>

              <section className="mb-4">
                <h3 className="font-bold mb-1">7. Children's Privacy</h3>
                <p>
                  Our services are not intended for children under 13. We do not
                  knowingly collect information from minors. If we become aware
                  of such data, we will take steps to delete it.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="font-bold mb-1">8. Changes to This Policy</h3>
                <p>
                  We may update this Privacy Policy occasionally to reflect
                  changes in our practices or legal requirements. Updates will
                  be posted on this page with a revised effective date.
                </p>
              </section>

              <section>
                <h3 className="font-bold mb-1">9. Contact Us</h3>
                <p>
                  <strong>
                    If you have any questions about this Privacy Policy or how
                    we handle your data, please contact us at:
                    📧support@inkitupprinting.com
                  </strong>
                </p>
              </section>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={closePrivacyModal}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
      {isReturnModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-screen overflow-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-indigo-700 text-white">
              <h2 className="text-xl font-bold">Return Policy</h2>
              <button
                onClick={closeReturnModal}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6 text-gray-800 text-sm">
              <p className="mb-4">
                <strong>
                  At Ink It Up Printing, every order is custom-made just for you
                  — which means we cannot accept returns or exchanges for
                  reasons such as incorrect size, color choice, or change of
                  mind.
                </strong>
              </p>

              <section className="mb-4">
                <h3 className="font-bold mb-1">❌ No Returns or Exchanges</h3>
                <p>
                  Since all of our products are printed on demand, we do{" "}
                  <strong>not</strong> offer returns or exchanges unless there
                  is an issue with the product you received.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="font-bold mb-1">
                  ✅ Damaged or Defective Items
                </h3>
                <p>
                  If your order arrives{" "}
                  <strong>damaged, misprinted, or defective</strong>, please
                  contact us within <strong>7 days</strong> of receiving your
                  item. We're happy to replace the item at{" "}
                  <strong>no additional cost</strong> to you.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="font-bold mb-1">To request a replacement:</h3>
                <ul className="list-disc ml-6 mt-1 mb-1">
                  <li>Email us at support@inkitupprinting.com</li>
                  <li>
                    Include your <strong>order number</strong>
                  </li>
                  <li>
                    Attach <strong>clear photos</strong> of the damaged or
                    incorrect item
                  </li>
                </ul>
                <p>
                  Once verified, we'll process your replacement as quickly as
                  possible.
                </p>
              </section>

              <section className="mb-4">
                <h3 className="font-bold mb-1">📦 Important Notes</h3>
                <ul className="list-disc ml-6 mt-1 mb-1">
                  <li>
                    Please{" "}
                    <strong>
                      double-check your size, color, and design selections
                    </strong>{" "}
                    before completing your order.
                  </li>
                  <li>
                    Returns or replacements will <strong>not</strong> be offered
                    for issues related to customer errors (e.g., wrong size
                    ordered).
                  </li>
                  <li>
                    We do not accept returns on any customized or personalized
                    items unless they are faulty.
                  </li>
                </ul>
              </section>

              <section>
                <p className="mb-2">
                  Thank you for supporting custom printing and small business.
                  If you have any questions, feel free to contact us — we're
                  here to help!
                </p>
                <p>
                  <strong>Email:</strong> support@inkitupprinting.com
                </p>
              </section>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={closeReturnModal}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {isContactModalOpen && (
                <ContactUs onClose={closeContactModal} />
            )} */}
    </footer>
  );
}
