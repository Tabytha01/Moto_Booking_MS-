import { MapPin, Clock, Star, Plus, ArrowRight, History, Bike } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Customer Dashboard | Moto Booking MS" };

const recent_rides = [
  { id: "BK008", rider: "John Banda", from: "Lusaka CBD", to: "Manda Hill", date: "Yesterday", status: "Completed", fare: "K 25.00" },
  { id: "BK007", rider: "Gift Mumba", from: "Levy Mall", to: "Chilenje", date: "2 days ago", status: "Completed", fare: "K 35.00" },
];

export default function CustomerDashboard() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Hello, Sarah!</h2>
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
          {recent_rides.map((ride) => (
            <div key={ride.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-green-50 transition-colors">
                    <Bike className="text-gray-400 group-hover:text-green-600 w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{ride.date}</p>
                    <p className="text-lg font-black text-gray-900">{ride.rider}</p>
                  </div>
                </div>

                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-gray-300 w-4 h-4 shrink-0" />
                    <div className="text-sm">
                      <span className="font-bold text-gray-700">{ride.from}</span>
                      <span className="text-gray-400 mx-2">→</span>
                      <span className="font-bold text-gray-700">{ride.to}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      {ride.status}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-black text-gray-900">{ride.fare}</p>
                  <button className="text-xs font-bold text-green-600 hover:underline mt-1">Download Receipt</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
