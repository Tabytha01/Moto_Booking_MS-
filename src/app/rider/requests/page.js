"use client";

import { useState, useEffect } from "react";
import { Bike, MapPin, User, Loader2, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RiderRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isActionLoading, setIsActionLoading] = useState(null); // stores bookingId being processed
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
          router.push("/login");
          return;
        }

        const res = await fetch("/api/rider/requests");
        if (!res.ok) throw new Error("Failed to fetch ride requests");
        
        const data = await res.json();
        setRequests(data.requests || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
    // Refresh requests every 30 seconds
    const interval = setInterval(fetchRequests, 30000);
    return () => clearInterval(interval);
  }, [router]);

  const handleAction = async (bookingId, action) => {
    setIsActionLoading(bookingId);
    try {
      const userStr = localStorage.getItem("user");
      const user = JSON.parse(userStr);

      const res = await fetch("/api/rider/bookings/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          riderId: user.id,
          action,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Action failed");
      }

      // If accepted, redirect to dashboard to see active ride
      if (action === "ACCEPT") {
        router.push("/rider/dashboard");
      } else {
        // For decline, just remove from UI for now
        setRequests(requests.filter(r => r.id !== bookingId));
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsActionLoading(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
        <p className="text-gray-500 font-bold animate-pulse text-lg tracking-widest uppercase">Searching for requests...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Ride Requests</h2>
          <p className="text-gray-500 font-medium text-lg">Available trips in your area.</p>
        </div>
        <div className="flex items-center gap-3 bg-gray-100 px-6 py-3 rounded-2xl">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-black text-gray-700 uppercase tracking-widest">{requests.length} Requests Found</span>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 border-2 border-red-100 p-8 rounded-[2rem] text-center">
          <p className="text-red-600 font-bold mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold">Retry</button>
        </div>
      ) : requests.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {requests.map((req) => (
            <div key={req.id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-green-500/10 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <p className="text-3xl font-black text-gray-900">K {req.fare?.toFixed(2) || "0.00"}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Estimated Fare</p>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center gap-10">
                {/* Customer Info */}
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center group-hover:bg-green-600 transition-colors">
                    <User className="text-green-600 group-hover:text-white w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Customer</p>
                    <p className="text-xl font-black text-gray-900">{req.customer.name}</p>
                    <p className="text-xs font-bold text-gray-400 mt-1">Requested {new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>

                {/* Route */}
                <div className="flex-1 bg-gray-50 rounded-3xl p-6 border border-gray-100 flex items-center justify-center gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/40" />
                    <p className="font-bold text-gray-700">{req.pickup}</p>
                  </div>
                  <ArrowRight className="text-gray-300 w-5 h-5" />
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/40" />
                    <p className="font-bold text-gray-700">{req.destination}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleAction(req.id, "ACCEPT")}
                    disabled={isActionLoading !== null}
                    className="flex-1 lg:flex-none bg-gray-900 text-white px-10 py-5 rounded-2xl font-black hover:bg-green-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-gray-200"
                  >
                    {isActionLoading === req.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                    Accept Ride
                  </button>
                  <button 
                    onClick={() => handleAction(req.id, "DECLINE")}
                    disabled={isActionLoading !== null}
                    className="flex-1 lg:flex-none bg-white text-red-600 border-2 border-red-50 px-6 py-5 rounded-2xl font-black hover:bg-red-50 transition-all flex items-center justify-center gap-3"
                  >
                    <XCircle className="w-5 h-5" />
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-200">
          <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gray-200/50">
            <Bike className="text-gray-300 w-12 h-12 animate-pulse" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 mb-3">Searching for rides...</h3>
          <p className="text-gray-500 font-medium text-lg max-w-md mx-auto">We'll notify you as soon as a new ride request comes in. Stay online!</p>
        </div>
      )}
    </div>
  );
}
