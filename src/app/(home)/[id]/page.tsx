




import Link from 'next/link';
import {ExternalLink} from 'lucide-react';
import Backbutton from '@/components/Backbutton';
import { positionData } from '@/lib/positionData';



export default async function InternshipDetail({ params }: { params: { id: string } }) {

  
const {id} = await params;
const position = positionData[id as keyof typeof positionData]; 
// console.log(id)


  

  const jobPosting = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: position.title,
    description: position.responsibilities.join(" "),
    datePosted: new Date().toISOString(),
    employmentType: "Internship",
    hiringOrganization: {
      "@type": "Organization",
      name: "PadhneAI",
      sameAs: "https://padhneai.com",
      logo: "https://careers.padhneai.com/logo.svg",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Janakpur",
        addressRegion: "Madhesh Pradesh",
        postalCode: "45600",
        streetAddress: "Janakpur Dham - 9, Pidari Chowk",
        addressCountry: "NP",
      },
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Nepal",
    },
    directApply: true,
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-800 py-12">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
      <Backbutton />

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">{position.emoji}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{position.title}</h1>
          </div>
          <p className="text-lg text-indigo-600 font-semibold">
            <span className="font-bold text-gray-700">Open Positions:</span> {position.slots}
          </p>
        </div>

        {/* Content Grid */}
        <div className="space-y-12 mb-12">
          
          {/* Responsibilities */}
          <Section title="Roles & Responsibilities" icon="📋">
            <ul className="space-y-3">
              {position.responsibilities.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-indigo-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Requirements */}
          <Section title="Requirements" icon="✅">
            <ul className="space-y-3">
              {position.requirements.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-purple-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Skills You'll Gain */}
          <Section title="Skills You’ll Gain" icon="🚀">
            <ul className="space-y-3">
              {position.skills.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Benefits */}
          <Section title="Benefits" icon="🎁">
            <ul className="space-y-3">
              {position.benefits.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Section>

        </div>

        {/* Apply Button */}
        <div className="text-center">
          <Link
            href={`/${id}/applicationform`}
          
            className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Apply Now
            <ExternalLink className="w-5 h-5 ml-2" />
          </Link>
          <p className="mt-4 text-gray-500 text-sm">
            Application form opens in new tab
          </p>
        </div>

        {/* General Benefits Note */}
        <div className="mt-16 p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">✨ General Benefits Across All Internships</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2 mt-1">•</span>
              Real-world project experience
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2 mt-1">•</span>
              Professional mentorship and guidance
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2 mt-1">•</span>
              Certificate of completion and recommendation letter
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2 mt-1">•</span>
              Opportunity to contribute to impactful projects and grow your career
            </li>
          </ul>
        </div>

      </div>
    </main>
  );
}

// Reusable Section Component
function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div
     
      className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="text-2xl mr-3">{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}