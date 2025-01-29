import React from "react";
import { Link} from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-950 text-white py-4 px-8 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold ">isPay</h1>
        <ul className="hidden md:flex space-x-6">
          <li>
            <a href="#home" className="hover:text-blue-400 transition">Home</a>
          </li>
          <li>
            <a href="#features" className="hover:text-blue-400 transition">Features</a>
          </li>
          <li>
            <a href="#security" className="hover:text-blue-400 transition">Security</a>
          </li>
          <li>
            <a href="#faq" className="hover:text-blue-400 transition">FAQ</a>
          </li>
          <li>
            <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
          </li>
        </ul>
        <div>
          <div>
          <Link to="/login-register">
            <button className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg font-medium transition">
              Login / Register
            </button>
          </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
