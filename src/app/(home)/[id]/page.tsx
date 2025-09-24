




import Link from 'next/link';
import {ExternalLink} from 'lucide-react';
import Backbutton from '@/components/Backbutton';

// Define position data (you can move this to a separate file later)
const positionData = {
  'data-scraping': {
    title: 'Data Scraping & Image-to-Text Extraction Intern',
    emoji: '🖥️',
    slots: 4,
    applyLink: 'https://forms.gle/FzJRvUjgiGNkvH2L7',
    responsibilities: [
      'Collect, clean, and structure data from websites and online sources.',
      'Develop web scraping scripts using Python, BeautifulSoup, Scrapy, or similar tools.',
      'Perform image-to-text extraction (OCR) from images, PDFs, and scanned documents.',
      'Store and manage structured data efficiently in databases.',
      'Collaborate with the team to analyze and utilize extracted data for insights.'
    ],
    requirements: [
      'Basic knowledge of Python programming.',
      'Familiarity with web scraping tools and techniques.',
      'Understanding of OCR/image-to-text tools like Tesseract, OpenCV, or similar libraries.',
      'Knowledge of databases like MySQL, PostgreSQL, or MongoDB is a plus.',
      'Attention to detail, analytical mindset, and problem-solving skills.'
    ],
    skills: [
      'Advanced web scraping and data extraction techniques.',
      'Image-to-text extraction using OCR technologies.',
      'Data cleaning, preprocessing, and database management.',
      'Real-world experience working with diverse datasets.'
    ],
    benefits: [
      'Hands-on experience in both web and image data extraction.',
      'Exposure to practical applications of OCR in data processing.',
      'Mentorship from experienced professionals.',
      'Internship certificate and opportunities to build a strong portfolio.'
    ]
  },
  'ui-ux-design': {
    title: 'UI/UX Design Intern',
    emoji: '🎨',
    slots: 1,
    applyLink: 'https://forms.gle/FzJRvUjgiGNkvH2L7',
    responsibilities: [
      'Design user-friendly interfaces for web and mobile applications.',
      'Create wireframes, prototypes, and high-fidelity design mockups.',
      'Conduct research on user behavior and industry trends.',
      'Work closely with developers to ensure design feasibility.'
    ],
    requirements: [
      'Basic knowledge of design tools like Figma, Adobe XD, or Sketch.',
      'Understanding of UI/UX principles and design thinking.',
      'Creativity, attention to detail, and problem-solving skills.',
      'Portfolio of design projects is a plus.'
    ],
    skills: [
      'User-centered design and wireframing.',
      'Prototyping and high-fidelity mockup creation.',
      'Improving user experience and interaction design.'
    ],
    benefits: [
      'Practical experience designing real projects.',
      'Exposure to industry-standard UI/UX design processes.',
      'Mentorship and feedback from senior designers.',
      'Internship certificate and skill-building opportunities.'
    ]
  },
  'react-native': {
    title: 'Mobile App Development Intern (React Native)',
    emoji: '📱',
    slots: 1,
    applyLink: 'https://forms.gle/FzJRvUjgiGNkvH2L7',
    responsibilities: [
      'Build and maintain cross-platform mobile applications using React Native.',
      'Integrate APIs and collaborate with backend developers.',
      'Optimize app performance and ensure smooth user experience.',
      'Troubleshoot, debug, and improve mobile applications.'
    ],
    requirements: [
      'Basic knowledge of JavaScript and React.',
      'Familiarity with mobile app development concepts.',
      'Understanding of API integration and state management.',
      'Problem-solving skills and willingness to learn.'
    ],
    skills: [
      'React Native development for iOS and Android.',
      'API integration and state management.',
      'Mobile app debugging and deployment.'
    ],
    benefits: [
      'Hands-on experience in building live mobile apps.',
      'Exposure to cross-platform development and real projects.',
      'Mentorship from experienced developers.',
      'Internship certificate and portfolio enhancement.'
    ]
  },
  'digital-marketing': {
    title: 'Digital Marketing Intern',
    emoji: '📢',
    slots: 5,
    applyLink: 'https://forms.gle/FzJRvUjgiGNkvH2L7',
    responsibilities: [
      'Assist in planning and executing digital marketing campaigns.',
      'Manage social media accounts and content creation.',
      'Monitor campaign performance using analytics tools.',
      'Research SEO/SEM strategies and optimize content for engagement.'
    ],
    requirements: [
      'Basic understanding of social media platforms and digital marketing concepts.',
      'Knowledge of content creation, SEO, and analytics tools is a plus.',
      'Creative mindset and good communication skills.',
      'Willingness to learn and adapt to new marketing strategies.'
    ],
    skills: [
      'Social media marketing and content creation.',
      'SEO/SEM and analytics-based marketing strategies.',
      'Data-driven decision making for campaigns.'
    ],
    benefits: [
      'Hands-on experience in digital marketing campaigns.',
      'Exposure to industry-standard tools and strategies.',
      'Mentorship from digital marketing experts.',
      'Internship certificate and professional growth opportunities.'
    ]
  }
};

export default async function InternshipDetail({ params }: { params: { id: string } }) {

  
const {id} = await params;
const position = positionData[id as keyof typeof positionData]; 
// console.log(id)

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