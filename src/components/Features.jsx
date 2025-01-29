import React from "react";

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
    <section className="py-20 px-8 bg-white">
      <h2 className="text-4xl font-bold text-center text-gray-900">Powerful Banking Features</h2>
      <p className="text-gray-600 text-center mt-4 max-w-2xl mx-auto">
        Experience next-generation banking with our innovative features designed for your financial success.
      </p>
      <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative bg-gray-100 p-8 rounded-lg shadow-md transition-transform transform hover:-translate-y-2"
          >
            <div className="text-5xl">{feature.icon}</div>
            <h3 className="text-2xl font-bold mt-4 text-gray-900">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Call to Action Buttons */}
  
    </section>
  );
};

export default Features;
