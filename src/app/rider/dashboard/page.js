"use client";

import { useState, useEffect } from "react";
import { Bike, TrendingUp, Clock, Wallet, CheckCircle, MapPin, Loader2, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RiderDashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isActionLoading, setIsActionLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("/api/rider/dashboard");
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

  const handleCompleteRide = async (bookingId) => {
    setIsActionLoading(true);
    try {
      const res = await fetch("/api/rider/bookings/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, action: "COMPLETE" }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to complete ride");
      }

      // Refresh data
      window.location.reload();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsActionLoading(false);
    }
  };

  if (isLoading || !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
        <p className="text-gray-500 font-bold animate-pulse text-lg tracking-widest uppercase">Loading Your Dashboard...</p>
      </div>
    );
  }

  const { user, stats, activeRides } = data;

  const statsDisplay = [
    { label: "Rides Today", value: stats.ridesToday, icon: Bike, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Rides", value: stats.totalRides, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { label: "Earnings Today", value: `K ${stats.earningsToday.toFixed(2)}`, icon: Wallet, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Rating", value: `${stats.rating.toFixed(1)} / 5.0`, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">
            Hello, <span className="text-green-600">{user.name}</span>!
          </h2>
          <p className="text-gray-500 font-medium text-lg">You are online and ready for rides.</p>
        </div>
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Active Status
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsDisplay.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-green-500/10 transition-all duration-300">
              <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                <Icon className="w-7 h-7" />
              </div>
              <p className="text-4xl font-black text-gray-900">{stat.value}</p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Ride Card */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <Clock className="text-green-600 w-6 h-6" />
            Active Trips
          </h3>
          
          {activeRides.length > 0 ? (
            activeRides.map((ride) => (
              <div key={ride.id} className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8">
                  <span className="bg-green-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-green-600/20">
                    {ride.status}
                  </span>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-12">
                  <div className="flex-1 space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-xl">
                        {ride.customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Customer</p>
                        <p className="text-2xl font-black text-gray-900">{ride.customer.name}</p>
                        <p className="text-green-600 font-bold flex items-center gap-2 mt-1">
                          <Phone className="w-4 h-4" />
                          {ride.customer.phone || "No phone provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                      <div className="flex flex-col items-center gap-2 mt-1">
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/40" />
                        <div className="w-0.5 h-10 bg-gray-200" />
                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/40" />
                      </div>
                      <div className="space-y-6 flex-1">
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pickup Location</p>
                          <p className="font-bold text-gray-800 text-lg">{ride.pickup}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Destination</p>
                          <p className="font-bold text-gray-800 text-lg">{ride.destination}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 min-w-[200px]">
                    <div className="bg-gray-100 p-6 rounded-3xl text-center mb-2">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Est. Fare</p>
                      <p className="text-3xl font-black text-gray-900">K {ride.fare?.toFixed(2)}</p>
                    </div>
                    <button className="bg-gray-900 text-white px-8 py-5 rounded-2xl font-black hover:bg-green-600 transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-3 group">
                      <MapPin className="w-5 h-5 group-hover:animate-bounce" />
                      Open Map
                    </button>
                    <button 
                      onClick={() => handleCompleteRide(ride.id)}
                      disabled={isActionLoading}
                      className="bg-green-50 text-green-600 px-8 py-5 rounded-2xl font-black hover:bg-green-100 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isActionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                      Complete Ride
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-50 rounded-[3rem] p-16 text-center border-2 border-dashed border-gray-200">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Bike className="text-gray-300 w-10 h-10" />
              </div>
              <h4 className="text-xl font-black text-gray-900 mb-2">No active rides</h4>
              <p className="text-gray-500 font-medium">Head over to Ride Requests to find new trips!</p>
            </div>
          )}
        </div>

        {/* Earnings Summary Card */}
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <TrendingUp className="text-orange-600 w-6 h-6" />
            Wallet
          </h3>
          <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-gray-400 font-black text-xs uppercase tracking-[0.2em] mb-3">Total Earnings</p>
              <p className="text-5xl font-black mb-10 tracking-tight">K {stats.totalEarnings.toFixed(2)}</p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Today</span>
                  <span className="font-black text-green-400 text-lg">+ K {stats.earningsToday.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Completed</span>
                  <span className="font-black text-lg">{stats.totalRides} Trips</span>
                </div>
                <button className="w-full bg-white text-gray-900 py-5 rounded-2xl font-black hover:bg-green-400 transition-all mt-6 shadow-xl">
                  Withdraw Funds
                </button>
              </div>
            </div>
            <Wallet className="absolute -right-12 -bottom-12 w-64 h-64 text-white/5 -rotate-12 group-hover:rotate-0 transition-all duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
