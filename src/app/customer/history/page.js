export const metadata = { title: "My Bookings | Moto Booking MS" };

const history = [
  { id: "BK001", from: "Lusaka CBD", to: "Chilenje", date: "2025-04-01", status: "Completed" },
  { id: "BK002", from: "Woodlands", to: "Matero", date: "2025-04-03", status: "Cancelled" },
  { id: "BK003", from: "Kabulonga", to: "Chelstone", date: "2025-04-05", status: "Pending" },
];

const statusColor = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-600",
};

export default function BookingHistoryPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">From</th>
              <th className="px-6 py-3 text-left">To</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((b) => (
              <tr key={b.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-mono">{b.id}</td>
                <td className="px-6 py-4">{b.from}</td>
                <td className="px-6 py-4">{b.to}</td>
                <td className="px-6 py-4">{b.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[b.status]}`}>{b.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
