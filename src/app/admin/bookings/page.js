export const metadata = { title: "All Bookings | Moto Booking MS" };

const bookings = [
  { id: "BK001", customer: "Alice Phiri", rider: "James Banda", from: "Lusaka CBD", to: "Chilenje", status: "Completed" },
  { id: "BK002", customer: "Bob Tembo", rider: "Peter Zulu", from: "Woodlands", to: "Matero", status: "Pending" },
  { id: "BK003", customer: "Grace Mwansa", rider: "Chanda Mwale", from: "Kabulonga", to: "Chelstone", status: "Cancelled" },
];

const statusColor = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-600",
};

export default function BookingsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Bookings</h2>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Rider</th>
              <th className="px-6 py-3 text-left">From</th>
              <th className="px-6 py-3 text-left">To</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-mono">{b.id}</td>
                <td className="px-6 py-4">{b.customer}</td>
                <td className="px-6 py-4">{b.rider}</td>
                <td className="px-6 py-4">{b.from}</td>
                <td className="px-6 py-4">{b.to}</td>
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
