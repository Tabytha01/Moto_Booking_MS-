"use client";

import { useState, useEffect } from "react";
import { Calendar, Loader2, MapPin, User, Bike } from "lucide-react";
import { useRouter } from "next/navigation";

const statusColor = {
  COMPLETED: "bg-green-100 text-green-700",
  ACCEPTED: "bg-blue-100 text-blue-700",
  PENDING: "bg-orange-100 text-orange-700",
  CANCELLED: "bg-red-100 text-red-600",
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
          router.push("/login");
          return;
        }

        const user = JSON.parse(userStr);
        if (user.role !== "ADMIN") {
          router.push("/login");
          return;
        }

        const res = await fetch("/api/admin/bookings");
        if (!res.ok) throw new Error("Failed to fetch bookings");
        
        const data = await res.json();
        setBookings(data.bookings);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
        <p className="text-gray-500 font-bold animate-pulse text-lg tracking-widest uppercase">Loading Bookings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">All Bookings</h2>
          <p className="text-gray-500 font-medium">View and manage all ride bookings on the platform.</p>
        </div>
        <div className="flex items-center gap-3 bg-gray-100 px-6 py-3 rounded-2xl">
          <Calendar className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-black text-gray-700 uppercase tracking-widest">{bookings.length} Bookings</span>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Booking ID</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Rider</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Pickup</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Destination</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Fare</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5 font-mono font-bold text-gray-900 text-sm">
                      #{booking.id.slice(0, 6)}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{booking.customer?.name || "N/A"}</p>
                          <p className="text-xs text-gray-400">{booking.customer?.phone || "No phone"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Bike className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{booking.rider?.name || "Pending"}</p>
                          <p className="text-xs text-gray-400">{booking.rider?.phone || "N/A"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-gray-700 text-sm">{booking.pickup}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="font-medium text-gray-700 text-sm">{booking.destination}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-black text-gray-900">
                      {booking.fare ? `K ${booking.fare.toFixed(2)}` : "N/A"}
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${statusColor[booking.status] || "bg-gray-100 text-gray-700"}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-500 font-medium">
                      {new Date(booking.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-8 py-16 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium text-lg">No bookings yet</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
