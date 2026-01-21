import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const ContactUs = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    useEffect(() => {
        setIsVisible(true);
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email Us',
            details: 'swatantracademy@gmail.com',
            subdetails: 'academyswatantra@gmail.com',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: Phone,
            title: 'Call Us',
            details: '+91 7428647056',
            subdetails: '+91 7428647056',
            color: 'from-green-500 to-teal-500',
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            details: 'A-69, Hauz Khas',
            subdetails: 'New Delhi - 110016, India',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: Clock,
            title: 'Working Hours',
            details: 'Mon - Fri: 9:00 AM - 6:00 PM',
            subdetails: 'Sat: 10:00 AM - 4:00 PM',
            color: 'from-orange-500 to-red-500',
        },
    ];

    const socialLinks = [
        { icon: Facebook, url: '#', label: 'Facebook', color: 'hover:text-blue-600' },
        { icon: Twitter, url: '#', label: 'Twitter', color: 'hover:text-sky-500' },
        { icon: Instagram, url: '#', label: 'Instagram', color: 'hover:text-pink-600' },
        { icon: Youtube, url: '#', label: 'YouTube', color: 'hover:text-red-600' },
    ];

    return (
        <div className="pt-20 min-h-screen bg-gray-50">
            <div className="bg-gradient-to-br from-blue-800 via-blue-1100 to-blue-900 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Contact Us
                        </h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {contactInfo.map((info, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mb-4`}>
                                <info.icon className="text-white" size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                            <p className="text-gray-600 text-sm mb-1">{info.details}</p>
                            <p className="text-gray-500 text-sm">{info.subdetails}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div
                        className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                            }`}
                    >
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Send us a Message
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Program Inquiry"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                                        placeholder="Tell us about your interest in our programs..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
                                >
                                    <span>Send Message</span>
                                    <Send className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
                                </button>
                            </form>
                        </div>
                    </div>

                    <div
                        className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                            }`}
                    >
                        <div className="bg-gradient-to-br from-blue-800 via-blue-1100 to-blue-900 rounded-3xl p-8 md:p-10 text-white h-full">
                            <h2 className="text-3xl font-bold mb-6">
                                Let's Connect
                            </h2>
                            <p className="text-blue-100 mb-8 leading-relaxed">
                                Whether you're interested in our programs, want to collaborate, or just have a question,
                                we're here to help. Our team typically responds within 24 hours.
                            </p>

                            <div className="space-y-6 mb-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-3">Quick Links</h3>
                                    <ul className="space-y-2 text-blue-100">
                                        <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                                            Application Process
                                        </li>
                                        <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                                            Scholarship Information
                                        </li>
                                        <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                                            Campus Tours
                                        </li>
                                        <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                                            FAQ
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-3">Follow Us</h3>
                                    <div className="flex space-x-4">
                                        {socialLinks.map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.url}
                                                aria-label={social.label}
                                                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
                                            >
                                                <social.icon size={20} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <h3 className="text-xl font-bold mb-3">Office Location</h3>
                                <div className="aspect-video bg-white/10 rounded-lg mb-4 flex items-center justify-center">
                                    <div className="w-full h-64 md:h-72 rounded-lg overflow-hidden shadow">
                                        <iframe
                                            className="w-full h-full border-0"
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3267.2610125681595!2d77.20840437520192!3d28.553298975708117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2134f81ff19%3A0x6053802de1118894!2sCentre%20for%20Civil%20Society!5e1!3m2!1sen!2sin!4v1767329689941!5m2!1sen!2sin"
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </div>
                                <p className="text-blue-100 text-sm">
                                    Visit us at our New Delhi office. Please schedule an appointment in advance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
