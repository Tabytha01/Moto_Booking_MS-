import Link from "next/link";

export const metadata = { title: "Customer Dashboard | Moto Booking MS" };

export default function CustomerDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome back! 👋</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-orange-100 text-orange-700 rounded-xl p-6">
          <p className="text-3xl font-bold">8</p>
          <p className="text-sm mt-1">Total Bookings</p>
        </div>
        <div className="bg-green-100 text-green-700 rounded-xl p-6">
          <p className="text-3xl font-bold">6</p>
          <p className="text-sm mt-1">Completed Rides</p>
        </div>
      </div>
      <Link href="/customer/book" className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
        + Book a Ride
      </Link>
    </div>
  );
}
