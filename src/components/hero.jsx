import React from "react";

const Hero = () => {
  return (
    <section id="home" className="py-20 px-8 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Side */}
        <div className="text-left max-w-xl">
          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Banking Made <span className="text-black">Simple</span> and <span className="text-gray-700">Secure</span>
          </h1>
          <p className="mt-6 text-gray-600">
            Experience seamless banking with our cutting-edge mobile app. Manage your finances anytime, anywhere with complete security and peace of mind.
          </p>
          <div className="mt-8 flex space-x-4">
            <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Get Started
            </button>
            <button className="border border-gray-500 hover:border-black text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Right Side */}
        <div className="mt-12 md:mt-0">
          <div className="bg-gray-100 rounded-lg p-6 shadow-lg max-w-lg mx-auto">
            <p className="text-lg text-gray-600">Current Balance</p>
            <h2 className="text-4xl font-semibold text-gray-900">
              $24,895.50 <span className="text-sm text-gray-600">USD</span>
            </h2>
            <div className="mt-4">
              <p className="text-green-600">+ $250.00</p>
              <p className="text-red-600">- $120.00</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats at the bottom spaced evenly */}
      <div className="mt-16 flex justify-between text-center max-w-6xl mx-auto">
        <div className="flex-1">
          <h3 className="text-3xl font-bold text-gray-900">2M+</h3>
          <p className="text-gray-600">Active Users</p>
        </div>
        <div className="flex-1">
          <h3 className="text-3xl font-bold text-gray-900">150+</h3>
          <p className="text-gray-600">Countries</p>
        </div>
        <div className="flex-1">
          <h3 className="text-3xl font-bold text-gray-900">$10B+</h3>
          <p className="text-gray-600">Transactions</p>
        </div>
        <div className="flex-1">
          <h3 className="text-3xl font-bold text-gray-900">99.9%</h3>
          <p className="text-gray-600">Uptime</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
