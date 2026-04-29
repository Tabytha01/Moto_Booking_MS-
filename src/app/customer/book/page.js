"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, MessageSquare, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export default function BookRidePage() {
  const [formData, setFormData] = useState({
    pickup: "",
    destination: "",
    dateTime: "",
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        router.push("/login");
        return;
      }
      const user = JSON.parse(userStr);

      const res = await fetch("/api/customer/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: user.id,
          pickup: formData.pickup,
          destination: formData.destination,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Booking failed");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/customer/dashboard");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-gray-900">Ride Booked!</h2>
          <p className="text-gray-500 font-medium">Redirecting you to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center lg:text-left">
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Book a Ride</h2>
        <p className="text-gray-500 font-medium text-lg">Enter your trip details to find a rider.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form Section */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100">
          <form onSubmit={handleBooking} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Pickup Location</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="pickup"
                    value={formData.pickup}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Kigali CBD"
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Drop-off Location</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Chilenje"
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-600/5 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Date & Time</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                    </div>
                    <input
                      type="datetime-local"
                      name="dateTime"
                      value={formData.dateTime}
                      onChange={handleChange}
                      required
                      className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 focus:outline-none focus:bg-white focus:border-green-500 transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Ride Type</label>
                  <select className="block w-full px-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 focus:outline-none focus:bg-white focus:border-green-500 transition-all duration-200 font-bold appearance-none">
                    <option>Standard Moto</option>
                    <option>Premium Moto</option>
                    <option>Delivery Only</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Notes (optional)</label>
                <div className="relative group">
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                  </div>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any special instructions..."
                    rows={3}
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-green-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full group relative flex justify-center py-5 px-4 border border-transparent rounded-2xl text-white bg-gray-900 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all duration-300 shadow-xl shadow-gray-200 hover:shadow-green-500/20 overflow-hidden ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <span className="relative z-10 font-black text-xl flex items-center gap-3">
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Confirm Booking <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <div className="bg-green-600 rounded-[2.5rem] p-8 text-white">
            <h4 className="text-xl font-black mb-4 uppercase tracking-wider">Why choose us?</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="bg-white/20 p-1 rounded-lg h-fit">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="font-bold text-sm">Vetted & Trained Riders</p>
              </li>
              <li className="flex gap-3">
                <div className="bg-white/20 p-1 rounded-lg h-fit">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="font-bold text-sm">Transparent Pricing</p>
              </li>
              <li className="flex gap-3">
                <div className="bg-white/20 p-1 rounded-lg h-fit">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="font-bold text-sm">24/7 Live Support</p>
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 rounded-[2.5rem] p-8 border border-gray-200">
            <h4 className="text-gray-900 font-black mb-2 uppercase tracking-wider">Estimated Fare</h4>
            <p className="text-3xl font-black text-green-600 mb-2">K 20.00 - K 50.00</p>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">Final fare depends on actual distance and traffic conditions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
