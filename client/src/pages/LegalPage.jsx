import { useState } from "react";
import { Shield, FileText, ChevronDown, ChevronUp } from "lucide-react";

const sections = [
  {
    title: "Introduction",
    content: `Swatantra Academy is grateful to all of its supporters including those who contribute time, material and/or money to help us continue doing our work. Swatantra Academy maintains strict donor privacy policies to protect the integrity and privacy of personal information gathered from our supporters and visitors through all of our communication channels, as well as from visitors to our Websites and those who donate through them.

Swatantra Academy does not sell, exchange, or rent your personal information to any organization or individual. We will not divulge personal information to any other organization or individual other than that necessary to transact, fulfil and or account for online donations that you have authorized.

Swatantra Academy will only use your phone number and email address if we need to verify information or to thank you for your contribution, ask for your opinion, request your assistance, or invite you to a special event.`,
  },
  {
    title: "Donor Privacy",
    content: `Swatantra Academy and its affiliates do not sell, share, or trade donors' names or personal information with other entities or send mailings on behalf of other organisations. With your permission, we may occasionally share information with related organisations about a particular project or campaign you are interested in. For example, if we are co-hosting an event with a partner organisation and you sign up to attend that event, we may ask your permission to share your contact details with our partner.`,
  },
  {
    title: "What Information Do We Collect?",
    content: `When you make a donation, attend an event or volunteer with Swatantra Academy, we may ask for information such as your name, age, occupation, address, nationality, email address, phone number, PAN and other relevant information Swatantra Academy may require.

Swatantra Academy uses cookies to facilitate authentication and personalization across our web systems. A cookie is a small amount of data that is sent to your web browser from a web server and stored on your computer's hard drive. Swatantra Academy uses only anonymous information (such as IP address) to track how our online visitors use our website.`,
  },
  {
    title: "How Do We Use Your Information?",
    content: `Swatantra Academy uses personally identifiable information you provide about yourself to:

• Process your donation
• Keep an accurate record of all the donations received
• Send you a receipt and thank you note for your donation or volunteering
• Respond to your questions or comments about Swatantra Academy
• Send you additional information about Swatantra Academy Projects or newsletters
• Ensure you receive the most appropriate and relevant information
• Send you invitations for upcoming events that may interest you

Swatantra Academy uses non-identifying basic information (aggregate data) to analyze site use and to improve the content and design of the site.`,
  },
  {
    title: "Opt-Out",
    content: `Swatantra Academy permits you to opt-out of receiving certain communications from the Site. We will not send unsolicited messages to you if you indicate that you do not wish to receive such messages. You can opt out of email updates by clicking the "unsubscribe" button at the bottom of each email or contacting us directly.

Usually, Swatantra Academy does not store user data. In case of specific sign-ups, the data is stored as per user request. The user can opt to delete all the information he/she has provided by simply requesting such by mail. All information, without exception, will be deleted in two working days.`,
  },
  {
    title: "Privacy of E-mail Lists",
    content: `Individuals who join Swatantra Academy's mailing lists via its website or through its campaigning engagements are added to its email database. Swatantra Academy does not sell, rent, loan, trade, or lease the addresses on our lists to anyone.`,
  },
  {
    title: "Payment Gateway",
    content: `Swatantra Academy uses well-recognised and proven technology for payments. Payment information is transferred by the use of an SSL connection which offers the highest degree of security that the donor's browser is able to support.

Several layers of built-in security, including an advanced firewall system, encryption of credit card numbers, and use of passwords, protect the collected information.

Credit/Debit Card Security: When you donate to Swatantra Academy online, your card information is secured; your credit card number is used only for that particular transaction and is not stored.`,
  },
  {
    title: "Is Donation Secure?",
    content: `Absolutely. The security and confidentiality of your information is our highest priority. We use industry-standard SSL (secure socket layer) technology to protect your information and provide a safe and secure environment for online donations.`,
  },
  {
    title: "Is Donation Tax-Deductible?",
    content: `Yes, it is. All bank transfers to Swatantra Academy are Tax Deductible under 80G. To claim tax exemption, please keep the donation receipt as your official record.

A donation receipt will be sent to you at the email address that you would have provided while making donations, as soon as your donation is processed.`,
  },
  {
    title: "Refund Policy",
    content: `No refund/cancellation for the donated amount by any donor will not be entertained; online donations will be through the online payment gateway. No cash or refund of money will be allowed. Once received, the donation for a cause will not be refunded to the donor.

However, refunds may be considered for unintended donations. To request a refund, please send an email to info@swatantraacademy.org stating the reason for your request within 2 days of making the donation, along with proof of the deduction.`,
  },
  {
    title: "No Liability",
    content: `Our Website has links to other websites that may collect identifiable information about you. Swatantra Academy cannot ensure the privacy practices of other sites and are not responsible for any damages due to them.`,
  },
  {
    title: "Copyright Protection",
    content: `All content on this Site including graphics, text, icons, interfaces, audio clips, logos, images and software is the property of Swatantra Academy and/or its content suppliers and is protected by Indian and international copyright laws.

Permission is given to use the resources of this Site only for the purposes of making enquiries or making a donation. Any other use, including the reproduction, modification, distribution, transmission, republication, display or performance, of the content on this Site can only be made with the express permission of Swatantra Academy.`,
  },
  {
    title: "General",
    content: `This Policy is governed by the laws of New Delhi, India, without regard to its conflict of laws principles. Jurisdiction for any claims arising under or out of this Policy shall lie exclusively with the state courts in New Delhi, India.

Swatantra Academy reserves the right to change the Privacy Policy at any time. By accessing the Site, you are indicating your agreement to this Policy. Any changes to this Policy will be effective immediately upon posting to this Site.

For any questions or comments, please contact us at info@swatantraacademy.org.`,
  },
];

const AccordionItem = ({ section, index }) => {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden mb-3 shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-semibold text-gray-800 text-base">{section.title}</span>
        {open ? (
          <ChevronUp size={18} className="text-blue-600 flex-shrink-0" />
        ) : (
          <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-6 pt-1 bg-white border-t border-gray-100">
          {section.content.split("\n\n").map((para, i) => (
            <p key={i} className="text-gray-600 leading-relaxed text-sm mb-3 last:mb-0 whitespace-pre-line">
              {para}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
              <Shield size={36} className="text-blue-200" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Privacy Policy &amp; Donor Guidelines for Swatantra Academy
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-blue-100">
            <FileText size={14} />
            Last updated: April 2026
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-gray-500 text-sm text-center mb-10 leading-relaxed">
          YOUR USE OF THE WEBSITE CONSTITUTES YOUR CONSENT TO ALL THE TERMS AND CONDITIONS
          CONTAINED IN THIS PRIVACY POLICY AND YOU SHALL BE BOUND BY THE SAME.
        </p>

        {sections.map((section, i) => (
          <AccordionItem key={i} section={section} index={i} />
        ))}

        {/* Contact box */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
          <h3 className="text-lg font-bold text-blue-900 mb-2">Questions?</h3>
          <p className="text-blue-700 text-sm mb-4">
            Contact us anytime regarding these terms or your personal information.
          </p>
          <a
            href="mailto:info@swatantraacademy.org"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-full transition-colors text-sm"
          >
            info@swatantraacademy.org
          </a>
        </div>
      </div>
    </div>
  );
}
