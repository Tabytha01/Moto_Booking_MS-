import Link from "next/link";
import { 
  LayoutDashboard, 
  Bike, 
  ClipboardList, 
  UserCog, 
  PlusCircle, 
  History, 
  LogOut,
  Bell
} from "lucide-react";

const navLinks = {
  admin: [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/riders", label: "Manage Riders", icon: UserCog },
    { href: "/admin/bookings", label: "All Bookings", icon: ClipboardList },
  ],
  rider: [
    { href: "/rider/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/rider/requests", label: "Ride Requests", icon: Bell },
  ],
  customer: [
    { href: "/customer/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/customer/book", label: "Book a Ride", icon: PlusCircle },
    { href: "/customer/history", label: "My Bookings", icon: History },
  ],
};

export default function Sidebar({ role }) {
  const links = navLinks[role] || [];
  
  return (
    <aside className="w-72 min-h-screen bg-gray-900 text-gray-300 flex flex-col p-6 border-r border-gray-800">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/20">
          <Bike className="text-white w-6 h-6" />
        </div>
        <span className="text-white font-bold text-xl tracking-tight">MotoBook</span>
      </div>

      <nav className="flex-1 space-y-1">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">
          {role} Menu
        </p>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 hover:text-white transition-all duration-200 group"
            >
              <Icon className="w-5 h-5 text-gray-500 group-hover:text-green-500 transition-colors" />
              <span className="text-sm font-semibold">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-800">
        <Link 
          href="/login" 
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span className="text-sm font-bold tracking-wide">Logout</span>
        </Link>
      </div>
    </aside>
  );
}
