import { Bike, TrendingUp, Clock, Wallet, CheckCircle, MapPin } from "lucide-react";

export const metadata = { title: "Rider Dashboard | Moto Booking MS" };

const stats = [
  { label: "Rides Today", value: "5", icon: Bike, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Total Rides", value: "89", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  { label: "Earnings Today", value: "K 75.00", icon: Wallet, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Completion Rate", value: "98%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
];

const activeRides = [
  { id: "BK009", customer: "Sarah Phiri", pickup: "Woodlands", destination: "Kabulonga", status: "In Progress", time: "10 mins ago" },
];

export default function RiderDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Rider Overview</h2>
        <p className="text-gray-500 font-medium">Welcome back, let's get you on the road.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-gray-900">{stat.value}</p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Ride Card */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="text-green-600 w-5 h-5" />
            Current Activity
          </h3>
          
          {activeRides.length > 0 ? (
            activeRides.map((ride) => (
              <div key={ride.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6">
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {ride.status}
                  </span>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                        {ride.customer.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Customer</p>
                        <p className="text-lg font-black text-gray-900">{ride.customer}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center gap-1 mt-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        <div className="w-0.5 h-8 bg-gray-200" />
                        <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pickup</p>
                          <p className="font-bold text-gray-800">{ride.pickup}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Destination</p>
                          <p className="font-bold text-gray-800">{ride.destination}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-gray-200">
                      View Map
                    </button>
                    <button className="bg-green-50 text-green-600 px-8 py-4 rounded-2xl font-bold hover:bg-green-100 transition-all">
                      Complete Ride
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-50 rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
              <p className="text-gray-500 font-bold">No active rides at the moment.</p>
            </div>
          )}
        </div>

        {/* Earnings Summary Card */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="text-orange-600 w-5 h-5" />
            Performance
          </h3>
          <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-xl">
            <p className="text-gray-400 font-bold text-sm uppercase tracking-widest mb-2">Total Balance</p>
            <p className="text-4xl font-black mb-8">K 1,250.00</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <span className="text-sm font-medium text-gray-400">Weekly Earnings</span>
                <span className="font-bold text-green-400">+K 450.00</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <span className="text-sm font-medium text-gray-400">Total Rides</span>
                <span className="font-bold">142</span>
              </div>
              <button className="w-full bg-white text-gray-900 py-4 rounded-2xl font-black hover:bg-green-400 transition-all mt-4">
                Withdraw Funds
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
