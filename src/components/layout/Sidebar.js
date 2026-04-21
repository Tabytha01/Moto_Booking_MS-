import Link from "next/link";

const navLinks = {
  admin: [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/riders", label: "Manage Riders" },
    { href: "/admin/bookings", label: "All Bookings" },
  ],
  rider: [
    { href: "/rider/dashboard", label: "Dashboard" },
    { href: "/rider/requests", label: "Ride Requests" },
  ],
  customer: [
    { href: "/customer/dashboard", label: "Dashboard" },
    { href: "/customer/book", label: "Book a Ride" },
    { href: "/customer/history", label: "My Bookings" },
  ],
};

export default function Sidebar({ role }) {
  const links = navLinks[role] || [];
  return (
    <aside className="w-60 min-h-screen bg-orange-600 text-white flex flex-col p-6 gap-2">
      <h1 className="text-xl font-bold mb-6">🏍️ MotoBook</h1>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="px-4 py-2 rounded-lg hover:bg-orange-700 transition text-sm font-medium">
          {link.label}
        </Link>
      ))}
      <div className="mt-auto">
        <Link href="/login" className="px-4 py-2 rounded-lg hover:bg-orange-700 transition text-sm font-medium block">
          Logout
        </Link>
      </div>
    </aside>
  );
}
