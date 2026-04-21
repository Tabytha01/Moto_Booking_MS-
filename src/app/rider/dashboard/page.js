export const metadata = { title: "Rider Dashboard | Moto Booking MS" };

const stats = [
  { label: "Rides Today", value: "5", color: "bg-orange-100 text-orange-700" },
  { label: "Total Rides", value: "89", color: "bg-blue-100 text-blue-700" },
  { label: "Earnings Today", value: "K 75.00", color: "bg-green-100 text-green-700" },
  { label: "Pending Requests", value: "2", color: "bg-yellow-100 text-yellow-700" },
];

export default function RiderDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Rider Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className={`rounded-xl p-6 font-semibold ${stat.color}`}>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
