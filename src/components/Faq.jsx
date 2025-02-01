import React, { useState } from "react";
import { motion } from "framer-motion";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "To reset your password, please contact our support team for further instructions.",
    },
    {
      question: "How do I set up a new savings goal?",
      answer: 'Navigate to the "Goals" section in your dashboard and click on "Create New Goal".',
    },
    {
      question: "How do I report a suspicious transaction?",
      answer: "If you notice a suspicious transaction, please contact our support team immediately or use the 'Report a Problem' feature in your account.",
    },
  ];

  return (
    <section id="faq" className="py-20 px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <p className="text-gray-600 mt-4">
          Find answers to common questions about our banking services.
        </p>
      </div>

      <div className="mt-12 max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <button
              onClick={() => toggleAnswer(index)}
              className="flex justify-between items-center w-full text-left text-gray-900 font-medium text-lg hover:text-blue-600 transition-colors"
            >
              <span>{faq.question}</span>
              <motion.svg
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={openIndex === index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-3 text-gray-700"
            >
              <p>{faq.answer}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
