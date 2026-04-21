export const metadata = { title: "Book a Ride | Moto Booking MS" };

export default function BookRidePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Book a Ride</h2>
      <div className="bg-white rounded-xl shadow p-8 max-w-lg">
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
            <input type="text" placeholder="e.g. Lusaka CBD" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Drop-off Location</label>
            <input type="text" placeholder="e.g. Chilenje" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
            <input type="datetime-local" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
            <textarea placeholder="Any special instructions..." rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <button type="submit" className="bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
