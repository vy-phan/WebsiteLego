import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const Quality = () => {
  const [accuracyCount, setAccuracyCount] = useState(0);
  const [testsCount, setTestsCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  
  const qualityFeatures = [
    {
      title: "Premium Materials",
      description: "Only the highest quality ABS plastic is used in our bricks, ensuring durability and safety for all ages.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      image: "https://www.lego.com/cdn/cs/history/assets/blt722cea1f343865b4/Quality-in-every-detail_story.jpg?width=3840&quality=68&auto=webp&format=webply"
    },
    {
      title: "Precision Manufacturing",
      description: "Each brick is manufactured with microscopic precision, ensuring perfect fit and clutch power every time.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      image: "https://th.bing.com/th/id/OIP.Ro3RfKSPGLSAHSTo7-9kkgHaE7?w=1354&h=902&rs=1&pid=ImgDetMain"
    },
    {
      title: "Rigorous Testing",
      description: "Every LEGO element undergoes extensive testing to ensure it meets our high standards for safety and durability.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      image: "https://th.bing.com/th/id/OIP.wgK27sEBEpAvdY6tBZ0VVgHaEK?rs=1&pid=ImgDetMain"
    }
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
        {decimals > 0 ? '%' : ''}
      </motion.div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://www.lego.com/cdn/cs/history/assets/blt338358fda1c4f150/B520.jpg?width=960&quality=68&auto=webp&format=webply"
            alt="LEGO Quality"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              Uncompromising Quality
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto"
            >
              Every LEGO brick tells a story of precision, innovation, and dedication to excellence
            </motion.p>
          </div>
        </div>
      </section>

      {/* Quality Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {qualityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 mb-20`}
            >
              <div className="flex-1">
                <div className="bg-yellow-500 rounded-full w-16 h-16 flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h2 className="text-3xl font-bold mb-4">{feature.title}</h2>
                <p className="text-gray-600 text-lg mb-6">{feature.description}</p>
              </div>
              <div className="flex-1">
                <div className="relative overflow-hidden rounded-lg shadow-xl">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-[400px] object-cover transform transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quality Stats */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-400 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-8 rounded-lg bg-yellow-600/50 backdrop-blur-sm hover:bg-yellow-600 transition-all duration-300"
            >
              <div className="text-4xl font-bold mb-2">
                <Counter value={99.99} duration={2000} decimals={2} />
              </div>
              <div className="text-lg">Production Accuracy</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 rounded-lg bg-yellow-600/50 backdrop-blur-sm hover:bg-yellow-600 transition-all duration-300"
            >
              <div className="text-4xl font-bold mb-2">
                <Counter value={1000} duration={2000} />+
              </div>
              <div className="text-lg">Quality Tests</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-8 rounded-lg bg-yellow-600/50 backdrop-blur-sm hover:bg-yellow-600 transition-all duration-300"
            >
              <div className="text-4xl font-bold mb-2">
                <Counter value={60} duration={2000} />+
              </div>
              <div className="text-lg">Years of Excellence</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Quality Standards & Certifications</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our commitment to quality is backed by internationally recognized standards and certifications,
              ensuring that every LEGO product meets the highest safety and quality requirements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="text-yellow-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">ISO 9001</h3>
              <p className="text-gray-600">
                Certified Quality Management System ensuring consistent quality in design, development, and manufacturing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="text-yellow-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">EN71 Safety Standard</h3>
              <p className="text-gray-600">
                Compliance with European toy safety standards, covering mechanical, chemical, and flammability requirements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="text-yellow-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">ASTM F963</h3>
              <p className="text-gray-600">
                Meeting US consumer safety specifications for toys, including strict testing for hazardous substances.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quality;