"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bike, MapPin, Calendar, Clock, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BookingHistoryPage() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/customer/dashboard");
        if (!res.ok) throw new Error("Failed to fetch booking history");
        
        const data = await res.json();
        // The dashboard API returns { user, bookings }
        setBookings(data.bookings || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
        <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest">Loading History...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/customer/dashboard" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">My Bookings</h2>
        </div>
        <p className="text-gray-500 font-bold bg-gray-100 px-4 py-2 rounded-full text-sm uppercase tracking-widest">
          {bookings.length} Total Rides
        </p>
      </div>

      {error ? (
        <div className="p-6 bg-red-50 border-2 border-red-100 rounded-3xl text-red-600 font-bold flex flex-col items-center gap-4">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-6 py-2 rounded-xl text-sm">Retry</button>
        </div>
      ) : bookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map((ride) => (
            <div key={ride.id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-green-500/10 transition-all group">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                {/* Left: Ride Info */}
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center group-hover:bg-green-50 transition-colors">
                    <Bike className="text-gray-400 group-hover:text-green-600 w-10 h-10" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Booking ID: {ride.id.slice(-6).toUpperCase()}</p>
                    <h3 className="text-2xl font-black text-gray-900">{ride.rider?.name || "Searching for Rider..."}</h3>
                    <div className="flex items-center gap-4 text-gray-500 font-bold text-sm uppercase tracking-widest">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(ride.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(ride.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle: Route */}
                <div className="flex-1 bg-gray-50 rounded-3xl p-6 border border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 justify-center">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/40" />
                      <p className="font-bold text-gray-700">{ride.pickup}</p>
                    </div>
                    <div className="hidden md:block h-px w-12 bg-gray-300" />
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/40" />
                      <p className="font-bold text-gray-700">{ride.destination}</p>
                    </div>
                  </div>
                </div>

                {/* Right: Status & Price */}
                <div className="text-right flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4">
                  <div>
                    <p className="text-3xl font-black text-gray-900">K {ride.fare?.toFixed(2) || "0.00"}</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Fare</p>
                  </div>
                  <span className={`text-xs font-black uppercase tracking-widest px-6 py-2 rounded-full ${
                    ride.status === "COMPLETED" ? "bg-green-100 text-green-700" : 
                    ride.status === "PENDING" ? "bg-orange-100 text-orange-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {ride.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-200">
          <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gray-200/50">
            <Bike className="text-gray-300 w-12 h-12" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 mb-3">No bookings found</h3>
          <p className="text-gray-500 font-medium text-lg mb-8 max-w-md mx-auto">Your trip history is empty. Time to book your first ride and explore the city!</p>
          <Link href="/customer/book" className="bg-green-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-gray-900 transition-all shadow-xl shadow-green-600/20">
            Book My First Ride
          </Link>
        </div>
      )}
    </div>
  );
}
