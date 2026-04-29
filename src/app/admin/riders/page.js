"use client";

import { useState, useEffect } from "react";
import { Users, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RidersPage() {
  const [riders, setRiders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const res = await fetch("/api/admin/riders");
        if (!res.ok) throw new Error("Failed to fetch riders");
        
        const data = await res.json();
        setRiders(data.riders);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRiders();
  }, [router]);

  const handleVerify = async (riderId, isVerified) => {
    setIsActionLoading(riderId);
    try {
      const res = await fetch("/api/admin/riders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ riderId, isVerified }),
      });

      if (!res.ok) throw new Error("Failed to update rider");
      
      // Refresh the list
      setRiders(riders.map(r => 
        r.id === riderId 
          ? { ...r, riderProfile: { ...r.riderProfile, isVerified } }
          : r
      ));
    } catch (err) {
      alert(err.message);
    } finally {
      setIsActionLoading(null);
    }
  };

  const handleDelete = async (riderId) => {
    if (!confirm("Are you sure you want to delete this rider?")) return;
    
    setIsActionLoading(riderId);
    try {
      const res = await fetch(`/api/admin/riders?riderId=${riderId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete rider");
      
      // Refresh the list
      setRiders(riders.filter(r => r.id !== riderId));
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
        <p className="text-gray-500 font-bold animate-pulse text-lg tracking-widest uppercase">Loading Riders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Manage Riders</h2>
          <p className="text-gray-500 font-medium">Verify and manage motorcycle riders on the platform.</p>
        </div>
        <div className="flex items-center gap-3 bg-gray-100 px-6 py-3 rounded-2xl">
          <Users className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-black text-gray-700 uppercase tracking-widest">{riders.length} Riders Total</span>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Name</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Phone</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">License</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Vehicle Type</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {riders.length > 0 ? (
                riders.map((rider) => (
                  <tr key={rider.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center font-black text-green-700">
                          {rider.name?.charAt(0) || "R"}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{rider.name || "Unnamed"}</p>
                          <p className="text-xs text-gray-400">{rider.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-medium text-gray-700">{rider.phone || "N/A"}</td>
                    <td className="px-8 py-5 font-medium text-gray-700">{rider.riderProfile?.licenseNumber || "N/A"}</td>
                    <td className="px-8 py-5 font-medium text-gray-700">{rider.riderProfile?.vehicleType || "N/A"}</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                        rider.riderProfile?.isVerified 
                          ? "bg-green-100 text-green-700" 
                          : "bg-orange-100 text-orange-700"
                      }`}>
                        {rider.riderProfile?.isVerified ? "VERIFIED" : "PENDING"}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        {!rider.riderProfile?.isVerified ? (
                          <button
                            onClick={() => handleVerify(rider.id, true)}
                            disabled={isActionLoading === rider.id}
                            className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-green-200 transition-all disabled:opacity-50 flex items-center gap-2"
                          >
                            {isActionLoading === rider.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                            Verify
                          </button>
                        ) : (
                          <button
                            onClick={() => handleVerify(rider.id, false)}
                            disabled={isActionLoading === rider.id}
                            className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-orange-200 transition-all disabled:opacity-50"
                          >
                            Suspend
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(rider.id)}
                          disabled={isActionLoading === rider.id}
                          className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-100 transition-all disabled:opacity-50"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-16 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium text-lg">No riders registered yet</p>
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
