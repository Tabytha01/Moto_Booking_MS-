export const metadata = { title: "Admin Dashboard | Moto Booking MS" };

const stats = [
  { label: "Total Riders", value: "24", color: "bg-blue-100 text-blue-700" },
  { label: "Total Customers", value: "138", color: "bg-green-100 text-green-700" },
  { label: "Bookings Today", value: "17", color: "bg-orange-100 text-orange-700" },
  { label: "Completed Rides", value: "312", color: "bg-purple-100 text-purple-700" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
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
