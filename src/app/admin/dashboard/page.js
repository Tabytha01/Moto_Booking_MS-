import { Users, Bike, Calendar, CheckCircle, TrendingUp, AlertCircle, ArrowUpRight } from "lucide-react";

export const metadata = { title: "Admin Dashboard | Moto Booking MS" };

const stats = [
  { label: "Total Riders", value: "24", icon: Bike, color: "text-blue-600", bg: "bg-blue-50", trend: "+12%" },
  { label: "Total Customers", value: "138", icon: Users, color: "text-green-600", bg: "bg-green-50", trend: "+18%" },
  { label: "Bookings Today", value: "17", icon: Calendar, color: "text-orange-600", bg: "bg-orange-50", trend: "+5%" },
  { label: "Completed Rides", value: "312", icon: CheckCircle, color: "text-purple-600", bg: "bg-purple-50", trend: "+24%" },
];

const recentBookings = [
  { id: "BK009", customer: "Sarah Phiri", rider: "John Banda", status: "Completed", amount: "K 25.00" },
  { id: "BK010", customer: "James Zulu", rider: "Pending", status: "Searching", amount: "K 15.00" },
  { id: "BK011", customer: "Grace Mutale", rider: "Gift Mumba", status: "In Progress", amount: "K 30.00" },
];

export default function AdminDashboard() {
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
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 group hover:border-green-100 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  {stat.trend}
                </span>
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
            <button className="text-sm font-bold text-green-600 hover:text-green-700">View All</button>
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
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900 text-sm">{booking.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{booking.customer}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{booking.rider}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                        booking.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'Searching' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-gray-900 text-right">{booking.amount}</td>
                  </tr>
                ))}
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
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs font-bold text-orange-400 uppercase mb-1">Pending Approval</p>
                <p className="text-sm font-medium text-gray-300">3 new riders waiting for document verification.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs font-bold text-green-400 uppercase mb-1">System Health</p>
                <p className="text-sm font-medium text-gray-300">All services are running smoothly.</p>
              </div>
              <button className="w-full bg-white text-gray-900 py-4 rounded-2xl font-black hover:bg-green-400 transition-all mt-4">
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
