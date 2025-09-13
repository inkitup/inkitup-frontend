import React, { useState } from "react";

export default function ContactModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Simulate successful submission (in a real app, this would be based on API response)
      if (formData.name && formData.email && formData.message) {
        setSubmitSuccess(true);
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          subject: "General Inquiry",
          message: ""
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitError(true);
        setTimeout(() => setSubmitError(false), 5000);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-screen overflow-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-indigo-700 text-white">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            📬 Send Us a Message
          </h2>
          <p className="mb-6 text-gray-600">
            Fill out the form below and we'll respond within 24 hours:
          </p>

          {submitSuccess && (
            <div className="mb-6 bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}

          {submitError && (
            <div className="mb-6 bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded">
              Please fill out all required fields.
            </div>
          )}

          <div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Order Question">Order Question</option>
                <option value="Logo Help">Logo Help</option>
                <option value="Bulk Order">Bulk Order</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white font-medium py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-300 flex justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>

        {/* Prefer Email section */}
        <div className="bg-gray-100 p-6 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              📧 Prefer Email?
            </h3>
            <p className="text-gray-600 mb-2">
              No problem! You can also reach us directly at:
            </p>
            <a 
              href="mailto:support@inkitupprinting.com" 
              className="text-indigo-600 font-medium hover:text-indigo-800 transition duration-300"
            >
              support@inkitupprinting.com
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 max-w-xs ml-3">
            <p className="text-sm text-gray-600">
              We're committed to providing exceptional customer service and will get back to you as quickly as possible.
            </p>
          </div>
        </div>

        {/* FAQ section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Frequently Asked Questions</h2>
          
          <div className="bg-white shadow-lg rounded-lg overflow-hidden divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-2">How long does shipping take?</h3>
              <p className="text-gray-600">Standard production time is 3-5 business days, plus 2-5 days for shipping depending on your location. Rush options are available for an additional fee.</p>
            </div>
            
            <div className="p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-2">Do you offer bulk discounts?</h3>
              <p className="text-gray-600">Yes! We offer volume discounts starting at 25+ units. The more you order, the more you save. Contact us for a custom quote.</p>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-2">Can I cancel or modify my order?</h3>
              <p className="text-gray-600">Since we start production quickly, changes must be requested within 2 hours of placing your order. Contact us immediately if you need to make changes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}