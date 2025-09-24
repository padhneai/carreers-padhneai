"use client"
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const Backbutton = () => {
  const router = useRouter();

  return (
   <>
     {/* Back Button */}
        <button
          onClick={() => router .back()}
          className="mb-8 flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
 
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Positions
        </button>
   </>
  )
}

export default Backbutton