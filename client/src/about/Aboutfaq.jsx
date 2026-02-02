import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faqData } from '../data/faq';

const AboutFaq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Georgia, serif' }}>
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our programs, admissions, and policies
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-xl overflow-hidden 
                         transition-all duration-300 hover:shadow-md"
            >
              {/* Question */}
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left
                           bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-bold text-gray-900 pr-8"
                    style={{ fontFamily: 'Georgia, serif' }}>
                  {faq.question}
                </h3>
                
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                                transition-all duration-300
                                ${openIndex === index 
                                  ? 'bg-blue-600 text-white rotate-180' 
                                  : 'bg-gray-100 text-gray-600'}`}>
                  {openIndex === index ? (
                    <Minus size={18} />
                  ) : (
                    <Plus size={18} />
                  )}
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out
                  ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-3"
              style={{ fontFamily: 'Georgia, serif' }}>
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our team is here to help. Reach out to us for more information.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full
                       bg-blue-600 text-white font-semibold
                       hover:bg-blue-700 transition-all duration-300
                       shadow-lg hover:shadow-xl hover:scale-105"
          >
            Contact Us
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

export default AboutFaq;