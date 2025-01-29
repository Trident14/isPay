import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cookies, setCookies, removeCookie] = useCookies(["access_token"]);

  // Toggle mobile menu
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  // Logout function
  const logout = () => {
    removeCookie("access_token", { path: '/' });
    window.localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="bg-[#E5E7EB] min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <nav className="fixed h-screen w-64 bg-white border-r border-neutral-200/20 hidden lg:flex flex-col">
          {/* Logo */}
          <div className="p-6">
            <div className="text-2xl font-bold text-blue-600">isPay</div>
          </div>
          {/* Navigation Links */}
          <div className='flex-1 gap-y-2 overflow-y-auto'>
              <div className="flex-1 px-4 space-y-2">
                {["Dashboard", "Transactions", "Savings"].map((item, index) => (
                  <a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 transition-all"
                  >
                    {item}
                  </a>
                ))}
              </div>
                {/* Profile & Logout */}
                  <div className="p-4 border-t border-neutral-200/20 mt-auto">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">JD</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">John Doe</p>
                        <p className="text-xs text-gray-500">john@example.com</p>
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Logout
                    </button>
                  </div>
            </div>
        </nav>

        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-neutral-200/20 z-50 p-4 flex items-center justify-between">
          <div className="text-xl font-bold text-blue-600">isPay</div>
          <button className="text-gray-500 hover:text-gray-600" onClick={toggleMobileMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-white z-40 transition-transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}>
          <div className="p-4 relative">
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-600" onClick={toggleMobileMenu}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="mt-8 space-y-4">
              {["Dashboard", "Transactions", "Savings"].map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  onClick={toggleMobileMenu}
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all"
                >
                  {item}
                </a>
              ))}
            </div>
            <button
              onClick={logout}
              className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
