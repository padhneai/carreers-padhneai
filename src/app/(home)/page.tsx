// app/internships/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import PositionCard from '@/components/PositionCard'; // Adjust path as needed
import ApplicationForm from '@/components/ApplicationForm';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function InternshipOverview() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const positions = [
    {
      id: 'data-scraping',
      title: 'Data Scraping & OCR',
      emoji: '🖥️',
      slots: 4,
      description: 'Collect, clean, and extract text from websites & images using Python, OCR tools, and store in databases.',
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Designer',
      emoji: '🎨',
      slots: 1,
      description: 'Design intuitive interfaces, create wireframes & prototypes, and improve user experience for our apps.',
    },
    {
      id: 'react-native',
      title: 'React Native Dev',
      emoji: '📱',
      slots: 1,
      description: 'Build cross-platform mobile apps, integrate APIs, and optimize performance for real users.',
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      emoji: '📢',
      slots: 5,
      description: 'Run campaigns, manage social media, analyze performance, and grow our user base with creative content.',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-800">
      <div className="flex flex-col items-center justify-start pt-24 pb-16 px-4 md:px-8 relative overflow-hidden">
      
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 -right-20 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-60 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-12 z-10 w-full max-w-4xl px-4">
          <motion.div className="mb-8 relative" variants={childVariants}>
            <Image 
              src="/logo.svg" 
              alt="PadhneAI Logo" 
              width={200} 
              height={200} 
              className="relative z-10" 
              priority 
            />
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 leading-tight"
            variants={childVariants}
          >
            Internship Opportunities
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-2xl text-center max-w-2xl mb-6 text-gray-600 font-medium"
            variants={childVariants}
          >
            Nepal’s First Bilingual AI Learning Platform – Learn, Contribute & Grow!
          </motion.p>
        </div>

        {/* Positions Grid */}
        <motion.div 
          className="w-full max-w-7xl z-10 mb-20 px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800 relative inline-block mx-auto"
            variants={childVariants}
          >
            Available Positions
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {positions.map((pos, index) => (
              <motion.div 
                key={pos.id} 
                variants={childVariants}
                custom={index}
                className="h-full"
              >
                <PositionCard {...pos} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.footer 
          className="mt-8 text-sm text-center w-full text-gray-500 pb-8 px-4" 
          variants={childVariants}
        >
          © {currentDate.getFullYear()} All Right Reserved By Padhne AI 
        </motion.footer>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
}