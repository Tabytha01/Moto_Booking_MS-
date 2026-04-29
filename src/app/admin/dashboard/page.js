"use client";

import { useState, useEffect } from "react";
import { Users, Bike, Calendar, CheckCircle, TrendingUp, AlertCircle, ArrowUpRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/dashboard");
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const dashboardData = await res.json();
        setData(dashboardData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
        <p className="text-gray-500 font-bold animate-pulse text-lg tracking-widest uppercase">Loading Dashboard...</p>
      </div>
    );
  }

  const statsDisplay = [
    { label: "Total Riders", value: data?.stats?.totalRiders || 0, icon: Bike, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Customers", value: data?.stats?.totalCustomers || 0, icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { label: "Bookings Today", value: data?.stats?.bookingsToday || 0, icon: Calendar, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Completed Rides", value: data?.stats?.completedRides || 0, icon: CheckCircle, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "ACCEPTED":
        return "bg-blue-100 text-blue-700";
      case "PENDING":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">System Overview</h2>
          <p className="text-gray-500 font-medium">Real-time platform performance and management.</p>
        </div>
        <button className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-green-600 transition-all flex items-center gap-2 shadow-lg shadow-gray-200">
          <Calendar className="w-4 h-4" />
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsDisplay.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 group hover:border-green-100 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-3xl font-black text-gray-900">{stat.value}</p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-black text-gray-900">Recent Activity</h3>
            <button 
              onClick={() => router.push("/admin/bookings")}
              className="text-sm font-bold text-green-600 hover:text-green-700"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Rider</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data?.recentBookings?.length > 0 ? (
                  data.recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900 text-sm">{booking.id.slice(0, 6)}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">{booking.customer?.name || "N/A"}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">{booking.rider?.name || "Pending"}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${getStatusStyle(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-black text-gray-900 text-right">
                        {booking.fare ? `K ${booking.fare.toFixed(2)}` : "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                      No bookings yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <AlertCircle className="text-orange-400 w-5 h-5" />
              System Alerts
            </h3>
            <div className="space-y-4">
              {data?.unverifiedRiders > 0 && (
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs font-bold text-orange-400 uppercase mb-1">Pending Approval</p>
                  <p className="text-sm font-medium text-gray-300">
                    {data.unverifiedRiders} new rider{data.unverifiedRiders !== 1 ? 's' : ''} waiting for verification.
                  </p>
                </div>
              )}
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs font-bold text-green-400 uppercase mb-1">System Health</p>
                <p className="text-sm font-medium text-gray-300">All services are running smoothly.</p>
              </div>
              <button 
                onClick={() => router.push("/admin/riders")}
                className="w-full bg-white text-gray-900 py-4 rounded-2xl font-black hover:bg-green-400 transition-all mt-4"
              >
                Review Riders
              </button>
            </div>
          </div>
          {/* Decorative background element */}
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-green-600/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
