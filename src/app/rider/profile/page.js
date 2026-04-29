"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, FileText, Bike, Save, Loader2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RiderProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    licenseNumber: "",
    vehicleType: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
          router.push("/login");
          return;
        }

        const user = JSON.parse(userStr);
        const res = await fetch(`/api/rider/profile?userId=${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        
        const data = await res.json();
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          licenseNumber: data.profile?.licenseNumber || "",
          vehicleType: data.profile?.vehicleType || "",
        });
      } catch (err) {
        setMessage({ type: "error", text: err.message });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const userStr = localStorage.getItem("user");
      const user = JSON.parse(userStr);

      const res = await fetch("/api/rider/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          ...formData,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update profile");
      }

      const data = await res.json();
      setMessage({ type: "success", text: "Profile updated successfully!" });
      
      // Update localStorage if name changed
      const updatedUser = { ...user, name: data.user.name };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
        <p className="text-gray-500 font-bold animate-pulse text-lg tracking-widest uppercase">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Your Profile</h2>
        <p className="text-gray-500 font-medium text-lg">Manage your personal and vehicle information.</p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 font-bold ${
          message.type === "success" ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-red-600 border border-red-100"
        }`}>
          {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/50 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <User className="text-green-600 w-5 h-5" />
              Personal Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block px-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-green-500 focus:bg-white rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 transition-all outline-none"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block px-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    disabled
                    value={formData.email}
                    className="w-full bg-gray-100 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-400 cursor-not-allowed outline-none"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-2 px-1 italic">Email cannot be changed.</p>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block px-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-green-500 focus:bg-white rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 transition-all outline-none"
                    placeholder="Enter your phone"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <Bike className="text-green-600 w-5 h-5" />
              Vehicle Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block px-1">License Number</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-green-500 focus:bg-white rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 transition-all outline-none"
                    placeholder="Enter license number"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block px-1">Vehicle Type</label>
                <div className="relative">
                  <Bike className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-green-500 focus:bg-white rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 transition-all outline-none appearance-none"
                  >
                    <option value="Standard Moto">Standard Moto</option>
                    <option value="Premium Moto">Premium Moto</option>
                    <option value="Delivery Moto">Delivery Moto</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-black hover:bg-green-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-gray-200 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
}
