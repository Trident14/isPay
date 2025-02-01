import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Instant Transfers",
    description: "Send and receive money instantly with zero fees between accounts. Supports international transfers.",
    icon: "💸",
  },
  {
    title: "Advanced Security",
    description: "Bank-grade encryption and multi-factor authentication to keep your money and data safe at all times.",
    icon: "🔒",
  },
  {
    title: "Smart Analytics",
    description: "Track spending patterns and get personalized insights to manage your finances better.",
    icon: "📊",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900">Powerful Banking Features</h2>
        <p className="text-gray-600 mt-4">
          Experience next-generation banking with our innovative features designed for your financial success.
        </p>
      </div>

      <div className="mt-12 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <div className="text-5xl">{feature.icon}</div>
            <h3 className="text-2xl font-bold mt-4 text-gray-900">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
