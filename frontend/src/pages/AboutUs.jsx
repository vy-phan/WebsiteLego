import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

const AboutUs = () => {
    const [activeTab, setActiveTab] = useState(0);
    
    const gradientStyle = {
        backgroundSize: '200% 200%',
        animation: 'gradient 8s ease infinite',
    };

    const achievements = [
        {
            number: "7.7+ Billion",
            title: "LEGO Minifigures",
            description: "Created since 1978, making it the world's largest population!",
            icon: "👥"
        },
        {
            number: "400+ Billion",
            title: "LEGO Bricks",
            description: "Produced since 1958. Enough to circle the Earth 5 times!",
            icon: "🧱"
        },
        {
            number: "100+",
            title: "Countries",
            description: "Where LEGO products are sold and loved by children and adults.",
            icon: "🌍"
        },
        {
            number: "60+",
            title: "Colors",
            description: "In the current LEGO color palette, each carefully selected.",
            icon: "🎨"
        }
    ];

    const funFacts = [
        "The name 'LEGO' comes from the Danish words 'LEg GOdt', meaning 'play well'",
        "Six 2x4 LEGO bricks can be combined in 915,103,765 different ways",
        "The LEGO minifigure is the largest population in the world",
        "LEGO makes about 19 billion elements every year",
        "The first LEGO brick made in 1958 still fits with modern bricks"
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "LEGO Master Builder",
            content: "LEGO isn't just a toy, it's a tool that unleashes creativity and brings people together.",
            image: "https://images.foxtv.com/static.fox13news.com/www.fox13news.com/content/uploads/2020/02/1280/720/LEGO-builders-WTVT-10.jpg?ve=1&tl=1"
        },
        {
            name: "David Chen",
            role: "LEGO Artist",
            content: "Every brick tells a story, and with LEGO, the possibilities are endless.",
            image: "https://photo-cms-tpo.epicdn.me/w890/Uploaded/2023/uqvppivp/2021_03_23/hoang_dang_an_industrial_designer_who_loves_lego_since_he_was_a_child_poses_in_front_of_his_pieces_at_his_home_in_hanoi_vietnam_1_7ldpof_TGQG.jpeg"
        },
        {
            name: "Emma Williams",
            role: "LEGO Education Specialist",
            content: "I've seen firsthand how LEGO transforms learning into an adventure.",
            image: "https://assets.education.lego.com/v3/assets/blt293eea581807678a/bltd84a37ac0652904b/5f86e31b721f8178f2e59aa3/testimonial_500x500_meadows.jpg?auto=webp&format=jpg&width=1200&quality=90&fit=bounds&locale=en-us"
        }
    ];

    return (
        <div className="bg-white">
            <style jsx>{`
                @keyframes gradient {
                    0% { background-position: 0% 50% }
                    50% { background-position: 100% 50% }
                    100% { background-position: 0% 50% }
                }
                @keyframes float {
                    0% { transform: translateY(0px) }
                    50% { transform: translateY(-10px) }
                    100% { transform: translateY(0px) }
                }
                @keyframes shine {
                    0% { transform: translateX(-100%) }
                    100% { transform: translateX(100%) }
                }
                .animate-gradient {
                    animation: gradient 8s ease infinite;
                    background-size: 200% 200%;
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                .shine-text {
                    position: relative;
                    overflow: hidden;
                }
                .shine-text::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.2),
                        transparent
                    );
                    animation: shine 3s linear infinite;
                }
                .text-glow:hover {
                    text-shadow: 0 0 10px rgba(255,255,255,0.8),
                                0 0 20px rgba(255,255,255,0.8),
                                0 0 30px rgba(255,255,255,0.8);
                }
                .text-shadow-pop {
                    transition: all 0.3s ease;
                }
                .text-shadow-pop:hover {
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                    transform: translateY(-2px);
                }
            `}</style>
            {/* banner giới thiệu nè */}
            <section className="relative h-[500px] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=2070&auto=format&fit=crop"
                    alt="Lego Hero"
                    className="absolute inset-0 w-full h-full object-cover filter blur-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                        <div className="relative shine-text">
                            <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-gradient" style={gradientStyle}>
                                Welcome to Our Lego Store
                            </h1>
                        </div>
                        <p className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-green-500 to-purple-500 animate-gradient animate-float">
                            Building Dreams, One Brick at a Time
                        </p>
                    </div>
                </div>
            </section>

            {/* Giới thiệu cửa hàng*/}
            <section className="py-16 px-4 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-shadow-pop">
                            About Our Store
                        </h2>
                        <p className="text-gray-600 mb-4 hover:text-blue-600 transition-colors duration-300 text-shadow-pop">
                            Welcome to our premier LEGO store, where imagination meets reality. We offer an extensive collection of LEGO sets,
                            from classic building blocks to the latest themed collections. Our mission is to bring joy and creativity to builders
                            of all ages.
                        </p>
                        <p className="text-gray-600">
                            We pride ourselves on providing exceptional customer service and maintaining a carefully curated selection of LEGO
                            products. Whether you're a seasoned collector or just starting your LEGO journey, our store is your destination
                            for all things LEGO.
                        </p>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-xl">
                        <div className="group relative overflow-hidden">
                            <img
                                src="https://th.bing.com/th/id/R.3094fec4bc39f5a57960351c19a9dd86?rik=bKCZ1MXWl1RPLQ&riu=http%3a%2f%2fwww.easytourchina.com%2fimages%2fPhoto%2fchina-has-its-first-legoland-park-in-shanghai%2fp268_d20160510095946_thumb_b.JPG&ehk=Q0%2fvR%2bT2CRSXxzbI7jOg5tOQIkhKe3GmjiS0nyznqdU%3d&risl=&pid=ImgRaw&r=0"
                                alt="Lego Store"
                                className="w-full h-[400px] object-cover transition duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-90"
                            />

                        </div>
                    </div>
                </div>
            </section>

            {/* Lich sử ra đờii giới thiệu*/}
            <section className="bg-gray-50 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 animate-gradient text-glow">
                        The LEGO Legacy
                    </h2>

                    <div className="space-y-12">
                        {/* 1932 */}
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="order-2 md:order-1">
                                <h3 className="text-2xl font-bold mb-4 text-yellow-600 hover:text-yellow-700 transition-all duration-300 text-shadow-pop transform hover:scale-105">
                                    1932 - The Beginning
                                </h3>
                                <p className="text-gray-600">
                                    Ole Kirk Christiansen, a carpenter from Billund, Denmark, establishes his business
                                    making wooden toys. The company name "LEGO" is derived from the Danish phrase
                                    "leg godt," which means "play well."
                                </p>
                            </div>
                            <div className="order-1 md:order-2">
                                <img
                                    src="https://th.bing.com/th/id/OIP.HlcfMqXIRtgEIkj2YU0zKwHaEO?rs=1&pid=ImgDetMain"
                                    alt="Early Lego"
                                    className="rounded-lg shadow-lg w-full h-[300px] object-cover transform transition-transform duration-300 hover:scale-110"
                                />
                            </div>
                        </div>

                        {/* 1949 */}
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <img
                                    src="https://images.contentstack.io/v3/assets/bltf69b9534ff115e06/blt3e6d6d32c5d56637/638606c6f33b43105dcda5a6/binding-bricks-date.jpg"
                                    alt="Plastic Bricks"
                                    className="rounded-lg shadow-lg w-full h-[300px] object-cover transform transition-transform duration-300 hover:scale-110"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-red-600 hover:text-red-700 transition-all duration-300 text-shadow-pop transform hover:scale-105">
                                    1949 - The Plastic Revolution
                                </h3>
                                <p className="text-gray-600">
                                    LEGO begins producing plastic toys, including the first version of the now-famous
                                    interlocking bricks. This marked a pivotal moment in the company's history,
                                    setting the foundation for the LEGO we know today.
                                </p>
                            </div>
                        </div>

                        {/* Present */}
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="order-2 md:order-1">
                                <h3 className="text-2xl font-bold mb-4 text-blue-600 hover:text-blue-700 transition-all duration-300 text-shadow-pop transform hover:scale-105">
                                    Present Day - A Global Phenomenon
                                </h3>
                                <p className="text-gray-600">
                                    Today, LEGO is one of the world's most beloved toy brands, producing billions of
                                    bricks annually. The company continues to innovate with new themes, digital
                                    experiences, and sustainable materials, while staying true to its core mission
                                    of inspiring and developing the builders of tomorrow.
                                </p>
                            </div>
                            <div className="order-1 md:order-2">
                                <img
                                    src="https://www.lego.com/cdn/cs/aboutus/assets/blt32c7f91ce008eec3/18000-people-in-15-countries.jpg?disable=upscale&width=1680&quality=55&crop=16:9"
                                    alt="Modern Lego"
                                    className="rounded-lg shadow-lg w-full h-[300px] object-cover transform transition-transform duration-300 hover:scale-110"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* các thanh chuyêjn hướng khác */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient text-glow">
                    Our Values
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="h-48 overflow-hidden">
                            <img
                                src="https://www.sunnyskyz.com/uploads/2021/06/4q5hh-lego-brick-recycled-plastic-1.jpg"
                                alt="Quality"
                                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        <Link to="/quality" >
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 transform transition-transform duration-300 group-hover:rotate-12">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold ml-4 group-hover:text-yellow-600 transition-all duration-300 transform group-hover:scale-105">Quality</h3>
                                </div>
                                <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                                    We ensure every LEGO set meets the highest standards of excellence, providing you with perfect pieces every time.
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="h-48 overflow-hidden">
                            <img
                                src="https://www.lego.com/cdn/cs/set/assets/blt00a31406c08ef63d/31208_OG.png?fit=crop&format=webply&quality=80&width=635&height=440&dpr=1.5"
                                alt="Creativity"
                                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        <Link to="/creativity">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 transform transition-transform duration-300 group-hover:rotate-12">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold ml-4 group-hover:text-red-600 transition-all duration-300 transform group-hover:scale-105">Creativity</h3>
                                </div>
                                <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                                    We inspire imagination and creative thinking through play, turning ideas into colorful brick creations.
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="h-48 overflow-hidden">
                            <img
                                src="https://media.kohlsimg.com/is/image/kohls/6017071_ALT5?wid=390&hei=390&op_sharpen=1"
                                alt="Fun"
                                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        <Link to="/fun">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 transform transition-transform duration-300 group-hover:rotate-12">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold ml-4 group-hover:text-blue-600 transition-all duration-300 transform group-hover:scale-105">Fun</h3>
                                </div>
                                <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                                    We believe in making learning and building enjoyable for everyone, creating moments of joy and discovery.
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ  */}
            <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white px-6 md:px-12 lg:px-24">
                <details className="group p-6 [&_summary::-webkit-details-marker]:hidden" open>
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                        <h2 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 group-open:scale-105 transition-transform duration-300">What is the purpose of this website?</h2>

                        <span className="relative size-5 shrink-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </span>
                    </summary>

                    <p className="mt-4 leading-relaxed text-gray-700">
                        This website is an e-commerce platform that allows users to browse and purchase products from a variety of categories.
                    </p>
                </details>

                <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                        <h2 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500 group-open:scale-105 transition-transform duration-300">How do I make a purchase on this website?</h2>

                        <span className="relative size-5 shrink-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </span>
                    </summary>

                    <p className="mt-4 leading-relaxed text-gray-700">
                        To make a purchase on this website, browse our product categories and select the product you wish to purchase. Click on the product to view its details, then click the "Add to Cart" button. Once you have added all the products you wish to purchase to your cart, click the "Checkout" button to proceed to the checkout process.
                    </p>
                </details>

                <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                        <h2 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-500 group-open:scale-105 transition-transform duration-300">What payment methods do you accept?</h2>

                        <span className="relative size-5 shrink-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </span>
                    </summary>

                    <p className="mt-4 leading-relaxed text-gray-700">
                        We accept all major credit cards, including Visa, Mastercard, American Express, and Discover.
                    </p>
                </details>
            </div>

            {/* New Achievements Section */}
            <section className="py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-white mb-12">LEGO By The Numbers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 shadow-xl"
                            >
                                <div className="text-4xl mb-4">{achievement.icon}</div>
                                <div className="text-3xl font-bold text-blue-600 mb-2">{achievement.number}</div>
                                <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                                <p className="text-gray-600">{achievement.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fun Facts Section */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 animate-gradient">
                        Did You Know?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {funFacts.map((fact, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="text-3xl">💡</div>
                                    <p className="text-gray-700">{fact}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-white mb-12">What LEGO Means To Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="bg-white rounded-lg overflow-hidden shadow-xl"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-600 italic mb-4">"{testimonial.content}"</p>
                                    <div className="font-semibold text-lg">{testimonial.name}</div>
                                    <div className="text-yellow-600">{testimonial.role}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Timeline Tabs */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                        LEGO Through The Years
                    </h2>
                    <div className="flex justify-center space-x-4 mb-8">
                        {['1930s', '1950s', '1970s', '1990s', '2000s', 'Today'].map((era, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                                    activeTab === index
                                        ? 'bg-yellow-500 text-white transform -translate-y-1 shadow-lg'
                                        : 'bg-gray-200 text-gray-700 hover:bg-yellow-100'
                                }`}
                            >
                                {era}
                            </button>
                        ))}
                    </div>
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-6 rounded-lg shadow-lg"
                    >
                        {/* 1930s Era */}
                        {activeTab === 0 && (
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <img
                                    src="https://th.bing.com/th/id/OIP.HlcfMqXIRtgEIkj2YU0zKwHaEO?rs=1&pid=ImgDetMain"
                                    alt="1930s LEGO"
                                    className="rounded-lg shadow-lg"
                                />
                                <div>
                                    <h3 className="text-2xl font-bold mb-4">The Wooden Toy Era</h3>
                                    <p className="text-gray-600">
                                        Ole Kirk Christiansen begins crafting wooden toys in his workshop in Billund, Denmark.
                                        The company name "LEGO" is officially registered in 1934, derived from the Danish phrase
                                        "leg godt" meaning "play well". During this period, the company focused on creating
                                        high-quality wooden toys, including cars, trucks, and pull toys.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* 1950s Era */}
                        {activeTab === 1 && (
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <img
                                    src="https://th.bing.com/th/id/R.c2071a1f7ef986c97dff25284e99d47a?rik=o0MeCqfYiH1Bhg&pid=ImgRaw&r=0"
                                    alt="1950s LEGO"
                                    className="rounded-lg shadow-lg"
                                />
                                <div>
                                    <h3 className="text-2xl font-bold mb-4">The Plastic Revolution</h3>
                                    <p className="text-gray-600">
                                        The 1950s marked a revolutionary change for LEGO with the introduction of plastic toys.
                                        In 1958, the modern LEGO brick design was patented, featuring the iconic interlocking
                                        tube system. This innovation allowed for countless building possibilities and set the
                                        foundation for LEGO's future success. The company also introduced the LEGO System of Play.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* 1970s Era */}
                        {activeTab === 2 && (
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <img
                                    src="https://www.lego.com/cdn/cs/history/assets/bltb62c49fa373e68a7/Factory.jpg?width=960&quality=68&auto=webp&format=webply"
                                    alt="1970s LEGO"
                                    className="rounded-lg shadow-lg"
                                />
                                <div>
                                    <h3 className="text-2xl font-bold mb-4">The Minifigure Revolution</h3>
                                    <p className="text-gray-600">
                                        The 1970s brought the introduction of LEGO minifigures and themed sets. In 1978,
                                        the first LEGO minifigure was created, revolutionizing play possibilities. LEGO also
                                        expanded its product line with the introduction of LEGO TECHNIC in 1977, bringing
                                        more complex and challenging builds for older enthusiasts.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* 1990s Era */}
                        {activeTab === 3 && (
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <img
                                    src="https://assets.catawiki.com/image/cw_normal/plain/assets/catawiki/assets/2019/1/25/8/d/7/8d7a5bdb-c849-4d68-a0c5-1174b8e1df07.jpg"
                                    alt="1990s LEGO"
                                    className="rounded-lg shadow-lg"
                                />
                                <div>
                                    <h3 className="text-2xl font-bold mb-4">Licensed Themes & Digital Era</h3>
                                    <p className="text-gray-600">
                                        The 1990s saw LEGO entering the digital age and acquiring major licenses. In 1999,
                                        LEGO released its first licensed theme with Star Wars™, marking a new era of
                                        collaboration. The company also ventured into video games and launched LEGO.com,
                                        bringing the brand into the digital space.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* 2000s Era */}
                        {activeTab === 4 && (
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <img
                                    src="https://th.bing.com/th/id/R.ebd04b523fd4d66ca5e3caec9156725d?rik=IMFelAga5XJmaQ&riu=http%3a%2f%2f4.bp.blogspot.com%2f_hGcT2AIJg4k%2fSMEBkUXH-MI%2fAAAAAAAACTY%2f9LxDNQjvT_Y%2fs400%2f2000usa%2b15.jpg&ehk=SUzZ1yt7LX7nfKqeeqG0YXuqY6nQjBw9LNiQi1oIoik%3d&risl=&pid=ImgRaw&r=0"
                                    alt="2000s LEGO"
                                    className="rounded-lg shadow-lg"
                                />
                                <div>
                                    <h3 className="text-2xl font-bold mb-4">Entertainment & Innovation</h3>
                                    <p className="text-gray-600">
                                        The 2000s brought massive expansion in LEGO's entertainment offerings. The first
                                        LEGOLAND outside Europe opened, LEGO video games became hugely popular, and new
                                        innovative themes like LEGO Bionicle captured imaginations worldwide. The company
                                        also focused on digital integration and interactive experiences.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Today Era */}
                        {activeTab === 5 && (
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <img
                                    src="https://th.bing.com/th/id/OIP.392Wo71UHHaD1ydU74I8KAHaE8?rs=1&pid=ImgDetMain"
                                    alt="Modern LEGO"
                                    className="rounded-lg shadow-lg"
                                />
                                <div>
                                    <h3 className="text-2xl font-bold mb-4">The Modern LEGO Universe</h3>
                                    <p className="text-gray-600">
                                        Today, LEGO is more than just a toy company - it's a global phenomenon. With successful
                                        movies, TV shows, video games, theme parks, and innovative product lines like LEGO Ideas
                                        and LEGO Architecture, the brand continues to evolve. Sustainability initiatives and
                                        digital innovations like LEGO VIDIYO and LEGO AR show the company's commitment to the future.
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default AboutUs