import React from 'react';

const Support = () => {
  return (
    <div id="contact" className="bg-white rounded-lg border border-neutral-200/20 p-6 pb-16 bg-[#E5E7EB]">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Help &amp; Support</h1>
        <p className="text-gray-600 mt-2">Get help with your account and banking services</p>
      </header>

      {/* Quick Help Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-neutral-200/20 p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Live Chat</h2>
          </div>
          <p className="text-gray-600 mb-4">Chat with our support team in real-time wa-9000xxxx</p>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Start Chat Now
          </button>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200/20 p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Phone Support</h2>
          </div>
          <p className="text-gray-600 mb-4">Call us at 1-800-isPay-HELP</p>
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" style={{marginTop:"1.5rem"}}>
            Call Now
          </button>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200/20 p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Email Support</h2>
          </div>
          <p className="text-gray-600 mb-4">Get help via email within 24 hours</p>
          <a href="mailto:isPay-support@example.com">
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors" style={{marginTop:"1.5rem"}}>
              Send Email
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Support;
