"use client";

import { useState, useEffect } from "react";
import { MapPin, Clock, Star, Plus, ArrowRight, History, Bike, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CustomerDashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("/api/customer/dashboard");
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        
        const dashboardData = await res.json();
        setData(dashboardData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (isLoading || !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
        <p className="text-gray-500 font-bold animate-pulse text-lg tracking-widest uppercase">Loading Your Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center p-6">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <Bike className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">Oops! Something went wrong</h2>
        <p className="text-gray-500 max-w-md mb-6 font-medium">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-green-600 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  const { user, bookings } = data;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">
            Hello, <span className="text-green-600">{user.name || "Customer"}</span>!
          </h2>
          <p className="text-gray-500 font-medium text-lg">Where are we going today?</p>
        </div>
        <Link href="/customer/book" className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-gray-900 transition-all shadow-xl shadow-green-600/20 group">
          <Plus className="w-6 h-6" />
          Book New Ride
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Quick Actions / Promos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <span className="bg-green-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4 inline-block">
              Special Offer
            </span>
            <h3 className="text-2xl font-black mb-2">Get 20% Off Your<br />Next 5 Rides</h3>
            <p className="text-gray-400 font-medium mb-6">Use code: MOTO2026</p>
            <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-green-400 transition-all">
              Claim Now
            </button>
          </div>
          <Bike className="absolute -right-8 -bottom-8 w-48 h-48 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
        </div>

        <div className="bg-green-50 rounded-[2.5rem] p-8 border border-green-100 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <Star className="text-orange-400 fill-orange-400 w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-green-800/60 uppercase tracking-widest">Rider Rating</p>
              <p className="text-2xl font-black text-green-900">4.9 / 5.0</p>
            </div>
          </div>
          <p className="text-green-800/80 font-medium">You're one of our top-rated passengers! Keep it up for exclusive rewards.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <History className="text-green-600 w-6 h-6" />
            Recent Trips
          </h3>
          <Link href="/customer/history" className="text-sm font-bold text-green-600 hover:text-green-700">View All History</Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {bookings.length > 0 ? (
            bookings.map((ride) => (
              <div key={ride.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-green-50 transition-colors">
                      <Bike className="text-gray-400 group-hover:text-green-600 w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                        {new Date(ride.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </p>
                      <p className="text-lg font-black text-gray-900">{ride.rider?.name || "Assigning Rider..."}</p>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                    <div className="flex items-center gap-3">
                      <MapPin className="text-gray-300 w-4 h-4 shrink-0" />
                      <div className="text-sm">
                        <span className="font-bold text-gray-700">{ride.pickup}</span>
                        <span className="text-gray-400 mx-2">→</span>
                        <span className="font-bold text-gray-700">{ride.destination}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                        ride.status === "COMPLETED" ? "bg-green-100 text-green-700" : 
                        ride.status === "PENDING" ? "bg-orange-100 text-orange-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {ride.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-black text-gray-900">K {ride.fare?.toFixed(2) || "0.00"}</p>
                    {ride.status === "COMPLETED" && (
                      <button className="text-xs font-bold text-green-600 hover:underline mt-1">Download Receipt</button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-50 rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Bike className="text-gray-300 w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-gray-900 mb-2">No rides yet!</h4>
              <p className="text-gray-500 font-medium mb-6">Ready to hit the road? Book your first ride now.</p>
              <Link href="/customer/book" className="inline-flex bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-900 transition-all">
                Book My First Ride
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
