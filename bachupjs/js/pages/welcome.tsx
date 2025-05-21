import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import ApplicationLogo from '@/components/ApplicationLogo';
import { useState } from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [activeCategory, setActiveCategory] = useState('All Equipment');

    const equipmentData = [;
        {
            title: 'CAT 320 Excavator',
            specs: ['20 Tonnes', 'Dig Depth: 6.5m', '158 HP'],
            price: 450,
            tag: 'Popular',
            category: 'Excavators',
            image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=60'
        },
        {
            title: 'Komatsu D65 Bulldozer',
            specs: ['22 Tonnes', 'Blade: 3.6m', '220 HP'],
            price: 550,
            category: 'Bulldozers',
            image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=60'
        },
        {
            title: 'JCB 3CX Backhoe',
            specs: ['8 Tonnes', 'Dig Depth: 4.2m', '92 HP'],
            price: 320,
            tag: 'New',
            category: 'Loaders',
            image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=60'
        },
        {
            title: 'Liebherr LTM Crane',
            specs: ['60 Tonnes', 'Max Height: 40m', '350 HP'],
            price: 1200,
            category: 'Cranes',
            image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=60'
        },
        {
            title: 'Volvo EC220 Excavator',
            specs: ['22 Tonnes', 'Dig Depth: 7.2m', '170 HP'],
            price: 480,
            category: 'Excavators',
            image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=60'
        },
        {
            title: 'CAT D6 Bulldozer',
            specs: ['18 Tonnes', 'Blade: 3.2m', '190 HP'],
            price: 520,
            category: 'Bulldozers',
            image: 'https://images.unsplash.com/photo-1621961458348-f013d219b50c?w=800&auto=format&fit=crop&q=60'
        },
        {
            title: 'Hitachi ZX200 Loader',
            specs: ['20 Tonnes', 'Bucket: 1.2mÂ³', '150 HP'],
            price: 380,
            category: 'Loaders',
            image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=60'
        },
        {
            title: 'Tadano ATF 90 Crane',
            specs: ['90 Tonnes', 'Max Height: 45m', '400 HP'],
            price: 1500,
            category: 'Cranes',
            image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=60'
        }
    ];

    const categories = ['All Equipment', 'Excavators', 'Bulldozers', 'Loaders', 'Cranes'];

    const filteredEquipment = activeCategory === 'All Equipment';
        ? equipmentData;
        : equipmentData.filter(item => item.category === activeCategory);

    return (
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {/* Top Bar */}
            <div className="bg-[#001659] text-white py-2.5">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-5">
                            <a href="tel:+1234567890" className="text-sm">(123) 456-7890</a>
                            <a href="mailto:info@snd-ksa.com" className="text-sm">info@snd-ksa.com</a>
                        </div>
                        <div className="flex gap-4">
                            <a href="#" className="text-sm hover:text-[#ff5e14]">Facebook</a>
                            <a href="#" className="text-sm hover:text-[#ff5e14]">Twitter</a>
                            <a href="#" className="text-sm hover:text-[#ff5e14]">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-5">
                        <Link href="/" className="text-2xl font-bold text-[#001659]">
                            SND<span className="text-[#ff5e14]"></span>
                        </Link>
                        <nav className="hidden md:flex gap-8">
                            <Link href="#" className="text-[#09162a] font-semibold hover:text-[#ff5e14]">Home</Link>
                            <Link href="#about" className="text-[#09162a] font-semibold hover:text-[#ff5e14]">About</Link>
                            <Link href="#services" className="text-[#09162a] font-semibold hover:text-[#ff5e14]">Services</Link>
                            <Link href="#equipment" className="text-[#09162a] font-semibold hover:text-[#ff5e14]">Equipment</Link>
                            <Link href="#contact" className="text-[#09162a] font-semibold hover:text-[#ff5e14]">Contact</Link>
                        </nav>
                        <div className="flex gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    Dashboard
                                </Link>
                            ) : (
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#09162a] hover:text-[#ff5e14] hover:border-[#ff5e14] transition-colors"
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-sm border border-[#09162a] px-5 py-1.5 text-sm leading-normal text-[#09162a] hover:bg-[#09162a] hover:text-white transition-colors"
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-[#09162a] text-white py-32 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl">
                        <div className="text-[#ff5e14] uppercase tracking-wider mb-4">Your Trusted Partner Since 2015</div>
                        <h1 className="text-5xl font-bold mb-6">Equipment Rental Excellence</h1>
                        <p className="text-lg mb-8 text-white/80">
                            Professional solutions with over 7 years of experience. We provide high-quality equipment rentals and expert services.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="#equipment"
                                className="bg-[#ff5e14] text-white px-8 py-4 font-semibold hover:bg-[#001659] transition-colors"
                                Explore Equipment
                            </Link>
                            <Link
                                href="#contact"
                                className="bg-[#001659] text-white px-8 py-4 font-semibold hover:bg-[#ff5e14] transition-colors"
                                Request Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <img src="/placeholder.jpg" alt="About Us" className="w-full rounded-lg shadow-xl" />
                            <div className="absolute -bottom-8 -right-8 bg-[#ff5e14] text-white w-36 h-36 rounded-full flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold">10</span>
                                <span className="text-sm uppercase">Years Experience</span>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-6 relative">
                                Who We Are
                                <div className="w-16 h-1 bg-[#ff5e14] mt-4"></div>
                            </h2>
                            <p className="text-gray-600 mb-6">
                                We are a leading provider of construction equipment rental services with over 7-10 years of industry experience. We maintain the highest standards of quality and reliability in everything we do.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-2">
                                    <span className="text-[#ff5e14]">âœ“</span>
                                    <span>Professional Service</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#ff5e14]">âœ“</span>
                                    <span>Latest Equipment</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#ff5e14]">âœ“</span>
                                    <span>Experienced Team</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#ff5e14]">âœ“</span>
                                    <span>24/7 Support</span>
                                </div>
                            </div>
                            <Link
                                href="#contact"
                                className="bg-[#ff5e14] text-white px-8 py-4 font-semibold hover:bg-[#001659] transition-colors inline-block"
                                Get In Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 relative inline-block text-[#09162a]">
                            Our Services
                            <div className="w-24 h-1.5 bg-[#ff5e14] mt-4 mx-auto"></div>
                        </h2>
                        <p className="text-gray-700 mt-4 max-w-2xl mx-auto font-medium">
                            Comprehensive solutions for construction, equipment rental, and specialized operations
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Equipment Rental',
                                description: 'Extensive fleet of construction and heavy equipment available for short and long-term rental with flexible terms and competitive rates.',
                                image: '/placeholder.jpg',
                                icon: 'ðŸšœ'
                            },
                            {
                                title: 'Construction Services',
                                description: 'Full-service construction solutions including earthwork, site preparation, and infrastructure development for various projects.',
                                image: '/placeholder.jpg',
                                icon: 'ðŸ—ï¸'
                            },
                            {
                                title: 'Pipeline Operations',
                                description: 'Specialized pipeline construction, maintenance, and repair services with experienced teams and advanced equipment.',
                                image: '/placeholder.jpg',
                                icon: 'ðŸ›¢ï¸'
                            },
                            {
                                title: 'Wellsite Services',
                                description: 'Complete wellsite preparation, maintenance, and support services for oil and gas operations.',
                                image: '/placeholder.jpg',
                                icon: 'â›ï¸'
                            },
                            {
                                title: 'Earthwork Solutions',
                                description: 'Comprehensive earthwork services including excavation, grading, and land development for various projects.',
                                image: '/placeholder.jpg',
                                icon: 'ðŸ”ï¸'
                            },
                            {
                                title: 'Technical Support',
                                description: '24/7 technical support, maintenance, and repair services for all equipment and operations.',
                                image: '/placeholder.jpg',
                                icon: 'ðŸ› ï¸'
                            }
                        ].map((service, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:-translate-y-2 transition-transform">
                                <div className="h-48 bg-gray-200 relative">
                                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-[#09162a]/50 flex items-center justify-center">
                                        <span className="text-5xl">{service.icon}</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-3 text-[#09162a]">{service.title}</h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                                    <Link
                                        href="#"
                                        className="text-[#ff5e14] font-semibold hover:text-[#09162a] transition-colors inline-flex items-center gap-2"
                                        Learn More
                                        <span className="text-lg">â†’</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Equipment Section */}
            <section id="equipment" className="py-24 bg-[#09162a]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 relative inline-block text-white">
                            Our Equipment Fleet
                            <div className="w-24 h-1.5 bg-[#ff5e14] mt-4 mx-auto"></div>
                        </h2>
                        <p className="text-gray-300 mt-4 max-w-2xl mx-auto font-medium">
                            Explore our extensive range of high-quality construction equipment available for rent
                        </p>
                    </div>
                    <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-3 font-semibold whitespace-nowrap transition-colors ${
                                    activeCategory === category
                                        ? 'bg-[#ff5e14] text-white'
                                        : 'bg-white/10 text-white hover:bg-[#ff5e14] hover:text-white'
                                }`}
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredEquipment.map((equipment, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-[#ff5e14] transition-colors">
                                <div className="h-48 bg-gray-200 relative group">
                                    <img
                                        src={equipment.image}
                                        alt={equipment.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        loading="lazy"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=60';
                                        }}
                                    />
                                    {equipment.tag && (
                                        <div className="absolute top-4 left-0 bg-[#ff5e14] text-white px-4 py-1 text-sm font-semibold">
                                            {equipment.tag}
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-3 text-[#09162a]">{equipment.title}</h3>
                                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                                        {equipment.specs.map((spec, i) => (
                                            <div key={i} className="flex items-center gap-1">
                                                <span>â€¢</span>
                                                <span>{spec}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link
                                        href="#contact"
                                        className="text-[#ff5e14] font-semibold hover:text-[#09162a] transition-colors inline-flex items-center gap-2"
                                        Request Quote
                                        <span className="text-lg">â†’</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4 relative inline-block text-[#09162a]">
                            Why Choose Us
                            <div className="w-16 h-1 bg-[#ff5e14] mt-4 mx-auto"></div>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                title: '7-10 Years Experience',
                                description: 'With a decade of industry experience, we deliver exceptional results on every project.',
                                icon: 'â­'
                            },
                            {
                                title: 'Modern Equipment',
                                description: 'Our fleet features the latest models, meticulously maintained for optimal performance.',
                                icon: 'ðŸšœ'
                            },
                            {
                                title: 'Expert Team',
                                description: 'Our certified professionals bring knowledge and expertise to every aspect of our services.',
                                icon: 'ðŸ‘¥'
                            },
                            {
                                title: '24/7 Support',
                                description: 'We\'re always available to address your questions and provide assistance whenever needed.',
                                icon: 'ðŸ›Ÿ'
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-white p-8 text-center rounded-lg shadow-lg hover:-translate-y-2 transition-transform">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">{feature.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-[#09162a]">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4 relative inline-block">
                            Contact Us
                            <div className="w-16 h-1 bg-[#ff5e14] mt-4 mx-auto"></div>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <p className="text-gray-600 mb-8">
                                Have questions about our services or need a quote? Reach out to our team and we'll get back to you promptly.
                            </p>
                            <div className="space-y-6">
                                {[
                                    {
                                        title: 'Our Location',
                                        content: '123 Industrial Zone, Business District, Saudi Arabia',
                                        icon: 'ðŸ“'
                                    },
                                    {
                                        title: 'Call Us',
                                        content: '(123) 456-7890',
                                        icon: 'ðŸ“ž'
                                    },
                                    {
                                        title: 'Email Us',
                                        content: 'info@snd-ksa.com',
                                        icon: 'âœ‰ï¸'
                                    },
                                    {
                                        title: 'Working Hours',
                                        content: 'Mon - Fri: 8:00 AM - 6:00 PM',
                                        icon: 'â°'
                                    }
                                ].map((info, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="text-[#ff5e14] text-2xl">{info.icon}</div>
                                        <div>
                                            <h4 className="font-semibold mb-1">{info.title}</h4>
                                            <p className="text-gray-600">{info.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-lg">
                            <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
                            <form className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-[#ff5e14] text-[#09162a] placeholder-gray-500"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-[#ff5e14] text-[#09162a] placeholder-gray-500"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        placeholder="Your Phone"
                                        className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-[#ff5e14] text-[#09162a] placeholder-gray-500"
                                    />
                                </div>
                                <div>
                                    <select className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-[#ff5e14] text-[#09162a]">
                                        <option value="" className="text-gray-500">Service Interested In</option>
                                        <option value="rental" className="text-[#09162a]">Equipment Rental</option>
                                        <option value="maintenance" className="text-[#09162a]">Maintenance</option>
                                        <option value="support" className="text-[#09162a]">Technical Support</option>
                                    </select>
                                </div>
                                <div>
                                    <textarea
                                        placeholder="Your Message"
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-[#ff5e14] text-[#09162a] placeholder-gray-500"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#ff5e14] text-white px-8 py-4 font-semibold hover:bg-[#001659] transition-colors"
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#09162a] text-white pt-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-12 pb-16">
                        <div>
                            <Link href="/" className="text-2xl font-bold mb-6 block">
                                SND<span className="text-[#ff5e14]">Rental</span>
                            </Link>
                            <p className="text-gray-400 mb-6">
                                Professional equipment rental services with over 7 years of industry experience.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#ff5e14] transition-colors">
                                    FB
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#ff5e14] transition-colors">
                                    TW
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#ff5e14] transition-colors">
                                    IN
                                </a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-6 relative">
                                Quick Links
                                <div className="w-10 h-0.5 bg-[#ff5e14] mt-2"></div>
                            </h3>
                            <ul className="space-y-3">
                                {['Home', 'About Us', 'Services', 'Equipment', 'Contact'].map((link, index) => (
                                    <li key={index}>
                                        <Link href="#" className="text-gray-400 hover:text-[#ff5e14] transition-colors">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-6 relative">
                                Our Services
                                <div className="w-10 h-0.5 bg-[#ff5e14] mt-2"></div>
                            </h3>
                            <ul className="space-y-3">
                                {['Equipment Rental', 'Maintenance', 'Technical Support', 'Training', 'Consulting'].map((service, index) => (
                                    <li key={index}>
                                        <Link href="#" className="text-gray-400 hover:text-[#ff5e14] transition-colors">
                                            {service}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-6 relative">
                                Contact Info
                                <div className="w-10 h-0.5 bg-[#ff5e14] mt-2"></div>
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="text-[#ff5e14]">ðŸ“</span>
                                    <span className="text-gray-400">123 Industrial Zone, Business District, Saudi Arabia</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-[#ff5e14]">ðŸ“ž</span>
                                    <span className="text-gray-400">(123) 456-7890</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-[#ff5e14]">âœ‰ï¸</span>
                                    <span className="text-gray-400">info@sndrental.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/10 py-6 text-center text-gray-400">
                        <p>&copy; 2024 SND Rental. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}


