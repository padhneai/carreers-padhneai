"use client";

import { useState } from "react";
import { Upload, User, Phone, Mail, CheckCircle, Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { createApplication } from "@/firebase/actions/application.action";
import { formatPosition } from "@/lib/formatposition";

interface ApplicationFormProps {
  position: string; // Job/internship position
}

export default function ApplicationForm({ position }: ApplicationFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [publicId, setPublicId] = useState<string | null>(null);
  const router = useRouter();

  const handleImageUpload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      return toast.warning("File size must be under 5MB");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setProgress(0);

      const res = await axios.post("/api/application", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
          setProgress(percent);
        },
      });

      const uploadedPublicId = res.data?.publicId;
      if (!uploadedPublicId) throw new Error("Upload failed");

      setPublicId(uploadedPublicId);
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
      setFile(null);
    } finally {
      setUploading(false);
    }
  };

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const selectedFile = e.target.files[0];

    if (selectedFile.type !== "application/pdf") {
      return toast.error("Only PDF files are allowed");
    }

    setFile(selectedFile);
    handleImageUpload(selectedFile);
  }
};


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      contact: { value: string };
    };

    const name = target.name.value.trim();
    const email = target.email.value.trim();
    const contact = target.contact.value.trim();

    // Form validation
    if (!name) return toast.error("Name is required");
    if (!email) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid email format");
    if (!contact) return toast.error("Contact number is required");
    if (!/^\d{6,15}$/.test(contact)) return toast.error("Invalid contact number");
    if (!publicId) return toast.error("Please upload your resume");

    setLoading(true);
    try {
      // 1️⃣ Save to Firestore
      await createApplication({ name, email, contact, resumePublicId: publicId, position:formatPosition(position) });

      // 2️⃣ Send acknowledgment email to applicant and notify team
      await axios.post("/api/sendmail", { name, email, position: formatPosition(position), contactnumber: contact });

      // Reset form
      target.name.value = "";
      target.email.value = "";
      target.contact.value = "";
      setFile(null);
      setPublicId(null);
      setProgress(0);

      setSuccess(true);

      // Auto-close dialog after 3 seconds and navigate back
      setTimeout(() => {
        setSuccess(false);
        router.back();
      }, 15000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6">
      {/* Full-page loading overlay for uploading */}
{uploading && (
  <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="flex flex-col items-center">
      <Loader2 className="animate-spin text-indigo-600 mb-2" size={40} />
      <p className="text-indigo-600 font-medium">Uploading resume, please wait...</p>
    </div>
  </div>
)}


      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg relative">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-indigo-600 mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        {/* Top Logo */}
        <div className="flex justify-center mb-6">
          <Image src="/logo.svg" alt="Logo" width={150} height={120} />
        </div>

        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-2">
           Apply for {formatPosition(position)}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                name="contact"
                type="tel"
                placeholder="Enter your contact number"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Resume Upload */}
          <div
            className={`border-2 rounded-xl p-6 text-center cursor-pointer transition relative ${
              publicId
                ? "border-green-500 bg-green-50"
                : "border-dashed border-gray-300 hover:border-indigo-400"
            }`}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="resume-upload"
            />
            <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
              {publicId ? (
                <CheckCircle className="text-green-600 mb-2" size={28} />
              ) : (
                <Upload className="text-indigo-500 mb-2" size={28} />
              )}
              <p className="text-gray-600">{file ? file.name : "Click to upload or drag & drop"}</p>
              {uploading && (
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}
              <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (max 5MB)</p>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center hover:bg-indigo-700 transition disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>

        {/* Success Dialog */}
        {success && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-2xl">
            <div className="bg-green-100 border border-green-300 rounded-2xl p-8 text-center shadow-xl w-3/4 max-w-md scale-105">
              <CheckCircle className="mx-auto text-green-600 mb-4" size={50} />
              <h3 className="text-2xl font-semibold text-green-700 mb-2">Successfully Applied!</h3>
              <p className="text-gray-600 mb-4">
                Your application has been submitted. Please check your email for acknowledgment.
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  router.back();
                }}
                className="mt-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
