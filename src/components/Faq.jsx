import React, { useState } from 'react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: 'How do I reset my password?',
            answer: 'To reset your password, please contact our support team for further instructions.',
        },
        {
            question: 'How do I set up a new savings goal?',
            answer: 'To set up a new savings goal, navigate to the "Goals" section in your dashboard and click on "Create New Goal".',
        },
        {
            question: 'How do I report a suspicious transaction?',
            answer: 'If you notice a suspicious transaction, please contact our support team immediately or use the "Report a Problem" feature in your account.',
        },
    ];

    return (
        <div id="faq" className="bg-white rounded-lg border border-neutral-200/20 p-6 pb-16 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6"> {/* Added space between FAQ items */}
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-neutral-200/20 pb-6"> {/* Increased bottom padding */}
                        <button
                            onClick={() => toggleAnswer(index)}
                            className="flex justify-between items-center w-full text-left text-gray-900 font-medium py-4 px-6 border border-gray-900 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            <span>{faq.question}</span>
                            <svg
                                className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {openIndex === index && (
                            <div className="mt-4 text-gray-700 pl-6"> {/* Added padding-left for answer content */}
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
