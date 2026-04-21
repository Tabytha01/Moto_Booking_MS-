export const metadata = { title: "Ride Requests | Moto Booking MS" };

const requests = [
  { id: "BK004", customer: "Mary Lungu", from: "Emmasdale", to: "Northmead", fare: "K 20.00" },
  { id: "BK005", customer: "David Mbewe", from: "Kalingalinga", to: "Lusaka CBD", fare: "K 15.00" },
];

export default function RiderRequestsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Ride Requests</h2>
      <div className="flex flex-col gap-4">
        {requests.map((req) => (
          <div key={req.id} className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800">{req.customer}</p>
              <p className="text-sm text-gray-500">{req.from} → {req.to}</p>
              <p className="text-sm font-medium text-orange-600 mt-1">{req.fare}</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition">Accept</button>
              <button className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-200 transition">Decline</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
