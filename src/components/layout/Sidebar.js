"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Bike, 
  ClipboardList, 
  UserCog, 
  PlusCircle, 
  History, 
  LogOut,
  Bell,
  Menu,
  X
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
    { href: "/rider/profile", label: "My Profile", icon: UserCog },
  ],
  customer: [
    { href: "/customer/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/customer/book", label: "Book a Ride", icon: PlusCircle },
    { href: "/customer/history", label: "My Bookings", icon: History },
  ],
};

export default function Sidebar({ role }) {
  const [isOpen, setIsOpen] = useState(false);
  const links = navLinks[role] || [];
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const closeSidebar = () => setIsOpen(false);
  
  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-xl shadow-lg hover:bg-gray-800 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-72 min-h-screen bg-gray-900 text-gray-300 flex flex-col p-6 border-r border-gray-800
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
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
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-green-600 text-white' 
                    : 'hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 transition-colors ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-500 group-hover:text-green-500'
                }`} />
                <span className="text-sm font-semibold">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all duration-200 group w-full"
          >
            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span className="text-sm font-bold tracking-wide">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
