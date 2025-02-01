import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cookies, , removeCookie] = useCookies(['access_token']);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

    const logout = () => {
      navigate('/login-register'); 
      setTimeout(() => {
        removeCookie('access_token', { path: '/' }); 
        window.localStorage.removeItem('username'); 
      }, 100); 
    };

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex flex-col w-64 h-screen fixed top-0 left-0 bg-white shadow-md border-r border-gray-200">
        <div className="p-6 text-2xl font-bold text-blue-600">isPay</div>
        <div className="flex-1 space-y-2 px-4">
          {['Dashboard', 'Transactions', 'Savings'].map((item, index) => (
            <a key={index} href={`#${item.toLowerCase()}`} className="block px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50">
              {item}
            </a>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 mt-auto">
          <button onClick={logout} className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Logout
          </button>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md border-b border-gray-200 z-50 p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">isPay</div>
        <button className="text-gray-500 hover:text-gray-600" onClick={toggleMobileMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar (Slide-in Menu) */}
      <div className={`fixed inset-0 bg-white z-40 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform lg:hidden`}>
        <div className="p-4 relative " style={{marginTop:"4rem"}}>
          <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-600" onClick={toggleMobileMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div className="mt-8 space-y-4">
            {['Dashboard', 'Transactions', 'Savings'].map((item, index) => (
              <a key={index} href={`#${item.toLowerCase()}`} onClick={toggleMobileMenu} className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg">
                {item}
              </a>
            ))}
          </div>
          <button onClick={logout} className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
