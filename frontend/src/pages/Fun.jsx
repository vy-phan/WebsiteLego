import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const Fun = () => {
  const [playersCount, setPlayersCount] = useState(0);
  const [setsCount, setSetsCount] = useState(0);
  const [satisfactionCount, setSatisfactionCount] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);

  const funFeatures = [
    {
      title: "Endless Possibilities",
      description: "With LEGO, your imagination is the only limit. Create anything you can dream of!",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      image: "https://www.lego.com/cdn/cs/set/assets/blt6e06bc88b2b4f0a2/UGC-Page-2404-SW-Grid-Image.jpg?format=webply&quality=80&dpr=1"
    },
    {
      title: "Family Bonding",
      description: "LEGO brings families together, creating memorable moments of shared joy and creativity.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      image: "https://www.lego.com/cdn/cs/set/assets/blt9c5e7e8aad5b6cc1/Insiders1-202404-Page-Content-Block-Mixed-Large.jpg?fit=crop&format=webply&quality=80&width=650&height=720&dpr=1.5"
    },
    {
      title: "Learning Through Play",
      description: "Develop problem-solving skills and creativity while having the time of your life!",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      image: "https://www.lego.com/cdn/cs/set/assets/blt17f91526b04edaef/HERO_-_Mobile.jpg?fit=crop&format=webply&quality=80&width=635&height=440&dpr=1.5"
    }
  ];

  const galleryImages = [
    "https://www.lego.com/cdn/cs/set/assets/bltafab609186d16442/Hero_(Him)_-_Mobile.jpg?fit=crop&format=webply&quality=80&width=635&height=440&dpr=1.5",
    "https://www.lego.com/cdn/cs/set/assets/blt3fa8ba612334e7c0/Rings_-_Ring_box_photo_-_hero_banner_-_Mobile.png?fit=crop&format=webply&quality=80&width=635&height=440&dpr=1.5",
    "https://www.lego.com/cdn/cs/set/assets/blt788cd1972a8836fc/HERO_31214_Mobile.jpg?fit=crop&format=webply&quality=80&width=635&height=440&dpr=1.5",
    "https://www.lego.com/cdn/cs/set/assets/blt9c5e7e8aad5b6cc1/Insiders1-202404-Page-Content-Block-Mixed-Large.jpg?fit=crop&format=webply&quality=80&width=650&height=720&dpr=1.5"
  ];

  const Counter = ({ value, duration, decimals = 0 }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
      if (!isVisible) return;
      
      let startTime;
      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        const currentCount = percentage * value;
        setCount(currentCount);
        
        if (percentage < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      
      requestAnimationFrame(animateCount);
    }, [value, duration, isVisible]);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        onViewportEnter={() => setIsVisible(true)}
      >
        {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
        {decimals > 0 ? '%' : '+'}
      </motion.div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative h-[500px] overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ y: y1 }}
        >
          <img
            src="https://www.lego.com/cdn/cs/set/assets/blt788cd1972a8836fc/HERO_31214_Mobile.jpg?fit=crop&format=webply&quality=80&width=635&height=440&dpr=1.5"
            alt="LEGO Fun"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        </motion.div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-4 text-shadow-lg"
            >
              Unlimited Fun with LEGO
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-shadow-md"
            >
              Where imagination meets endless possibilities
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section with Floating Animation */}
      <section className="py-16 bg-white relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{ y: y2 }}
        >
          <img
            src="https://www.lego.com/cdn/cs/set/assets/bltd70c61ea91d1c003/76421-PDP-Hero-1.jpg?fit=crop&format=webply&quality=80&width=635&height=440&dpr=1.5"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl font-bold text-yellow-500 mb-2">
                <Counter value={1000000} duration={2000} /> 
              </div>
              <p className="text-gray-600">Happy Players Worldwide</p>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl font-bold text-yellow-500 mb-2">
                <Counter value={5000} duration={2000} />
              </div>
              <p className="text-gray-600">Unique LEGO Sets</p>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl font-bold text-yellow-500 mb-2">
                <Counter value={98} duration={2000} decimals={1} />
              </div>
              <p className="text-gray-600">Player Satisfaction</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Animations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {funFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform-gpu"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <motion.div 
                      className="text-yellow-500 mr-3"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Gallery Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            LEGO Gallery
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-lg shadow-xl aspect-[4/3]"
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6 text-shadow-sm"
          >
            Ready to Start Your LEGO Adventure?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-lg mb-8"
          >
            Join millions of LEGO enthusiasts and start building your dreams today!
          </motion.p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-yellow-500 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
          >
            <Link to="/discover">Get Started Now</Link>
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Fun;