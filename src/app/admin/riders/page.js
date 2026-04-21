export const metadata = { title: "Manage Riders | Moto Booking MS" };

const riders = [
  { id: 1, name: "James Banda", phone: "+260 977 111 222", status: "Active" },
  { id: 2, name: "Chanda Mwale", phone: "+260 966 333 444", status: "Inactive" },
  { id: 3, name: "Peter Zulu", phone: "+260 955 555 666", status: "Active" },
];

export default function RidersPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Riders</h2>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider) => (
              <tr key={rider.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{rider.id}</td>
                <td className="px-6 py-4">{rider.name}</td>
                <td className="px-6 py-4">{rider.phone}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${rider.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {rider.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-red-500 hover:underline text-xs">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
