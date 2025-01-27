import React from 'react'
import { Link } from 'react-router-dom'

const AboutUs = () => {
    return (
        <div className="bg-white">
            {/* banner giới thiệu nè */}
            <section className="relative h-[500px] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=2070&auto=format&fit=crop"
                    alt="Lego Hero"
                    className="absolute inset-0 w-full h-full object-cover filter blur-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-4 animate-pulse">Welcome to Our Lego Store</h1>
                        <p className="text-xl animate-fade-in">Building Dreams, One Brick at a Time</p>
                    </div>
                </div>
            </section>

            {/* Giới thiệu cửa hàng*/}
            <section className="py-16 px-4 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">About Our Store</h2>
                        <p className="text-gray-600 mb-4">
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
                    <h2 className="text-3xl font-bold text-center mb-12">The LEGO Legacy</h2>

                    <div className="space-y-12">
                        {/* 1932 */}
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="order-2 md:order-1">
                                <h3 className="text-2xl font-bold mb-4">1932 - The Beginning</h3>
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
                                <h3 className="text-2xl font-bold mb-4">1949 - The Plastic Revolution</h3>
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
                                <h3 className="text-2xl font-bold mb-4">Present Day - A Global Phenomenon</h3>
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
                <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
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
                                    <h3 className="text-xl font-bold ml-4 group-hover:text-yellow-600 transition-colors duration-300">Quality</h3>
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
                                    <h3 className="text-xl font-bold ml-4 group-hover:text-red-600 transition-colors duration-300">Creativity</h3>
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
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 transform transition-transform duration-300 group-hover:rotate-12">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold ml-4 group-hover:text-blue-600 transition-colors duration-300">Fun</h3>
                            </div>
                            <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                                We believe in making learning and building enjoyable for everyone, creating moments of joy and discovery.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ  */}
            <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white px-6 md:px-12 lg:px-24">
                <details className="group p-6 [&_summary::-webkit-details-marker]:hidden" open>
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                        <h2 className="text-lg font-medium">What is the purpose of this website?</h2>

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
                        <h2 className="text-lg font-medium">How do I make a purchase on this website?</h2>

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
                        <h2 className="text-lg font-medium">What payment methods do you accept?</h2>

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
        </div>
    )
}

export default AboutUs