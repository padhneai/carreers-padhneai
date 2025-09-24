// components/PositionCard.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

interface PositionCardProps {
  id: string; // Add this for routing
  title: string;
  emoji: string;
  slots: number;
  description: string;
}

const itemVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      duration: 0.8, 
      ease: 'easeOut',
      type: "spring",
      stiffness: 100
    } 
  },
};

export default function PositionCard({ 
  id,
  title, 
  emoji, 
  slots, 
  description 
}: PositionCardProps) {
  return (
    <Link href={`/${id}`} passHref>
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl p-6 md:p-7 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full group cursor-pointer"
        whileHover={{ y: -10 }}
      >
        {/* Card Header */}
        <div className="mb-5 pb-4 border-b border-gray-100">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 flex items-center group-hover:scale-105 transition-transform duration-300">
            <span className="mr-3 text-2xl md:text-3xl transform group-hover:rotate-6 transition-transform duration-300">
              {emoji}
            </span>
            {title}
          </h3>
          <p className="text-indigo-600 font-semibold text-lg">
            <span className="font-bold text-gray-700">Positions:</span> {slots} Open
          </p>
        </div>

        {/* Short Description */}
        <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base line-clamp-3">
          {description}
        </p>

        {/* CTA */}
        <div className="mt-auto">
          <span className="inline-block text-indigo-600 font-medium group-hover:underline">
            View Details →
          </span>
        </div>
      </motion.div>
    </Link>
  );
}