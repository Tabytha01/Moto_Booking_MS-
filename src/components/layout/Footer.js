import Link from "next/link";
import { Bike, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-6" id="contact">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-xl mb-3">
            <Bike className="w-5 h-5 text-green-400" />
            MotoBook
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Fast, safe, and reliable motorcycle transport booking. Connecting customers with trusted riders across the city.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="#how-it-works" className="hover:text-green-400 transition">How It Works</a></li>
            <li><a href="#features" className="hover:text-green-400 transition">Features</a></li>
            <li><a href="#roles" className="hover:text-green-400 transition">Who It&apos;s For</a></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-white font-semibold mb-3">Account</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/login" className="hover:text-green-400 transition">Login</Link></li>
            <li><Link href="/register" className="hover:text-green-400 transition">Register as Customer</Link></li>
            <li><Link href="/register" className="hover:text-green-400 transition">Register as Rider</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-3">Contact Us</h4>
          <ul className="flex flex-col gap-3 text-sm text-gray-400">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-green-400" /> support@motobook.com</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-green-400" /> +260 97X XXX XXX</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-green-400" /> Kigali-Rwanda</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} MotoBook. All rights reserved.
      </div>
    </footer>
  );
}
