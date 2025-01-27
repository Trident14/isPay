import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-950 text-white py-5 px-8 shadow-lg sticky top-0 z-5">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">isPay</h1>
        <ul className="hidden md:flex space-x-6">
          <li>
            <a href="#home" className="hover:text-blue-400 cursor-pointer">
              Home
            </a>
          </li>
          <li>
            <a href="#features" className="hover:text-blue-400 cursor-pointer">
              Features
            </a>
          </li>
          <li>
            <a href="#security" className="hover:text-blue-400 cursor-pointer">
              Security
            </a>
          </li>
          <li>
            <a href="#mobile-app" className="hover:text-blue-400 cursor-pointer">
              Mobile App
            </a>
          </li>
          <li>
            <a href="#accounts" className="hover:text-blue-400 cursor-pointer">
              Accounts
            </a>
          </li>
          <li>
            <a href="#faq" className="hover:text-blue-400 cursor-pointer">
              FAQ
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-blue-400 cursor-pointer">
              Contact
            </a>
          </li>
        </ul>
        <div>
          <a href="#login-register">
            <button className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg font-medium">
              Login / Register
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
