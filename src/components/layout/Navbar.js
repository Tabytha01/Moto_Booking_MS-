"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Bike } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-green-700 font-bold text-xl">
          <Bike className="w-6 h-6 text-green-600" />
          MotoBook
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <li><a href="#how-it-works" className="hover:text-green-600 transition">How It Works</a></li>
          <li><a href="#features" className="hover:text-green-600 transition">Features</a></li>
          <li><a href="#roles" className="hover:text-green-600 transition">Who It&apos;s For</a></li>
          <li><a href="#contact" className="hover:text-green-600 transition">Contact</a></li>
        </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm font-semibold text-green-700 hover:underline">
            Login
          </Link>
          <Link href="/register" className="bg-green-600 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-green-700 transition">
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4 text-sm font-medium text-gray-700">
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="hover:text-green-600">How It Works</a>
          <a href="#features" onClick={() => setMenuOpen(false)} className="hover:text-green-600">Features</a>
          <a href="#roles" onClick={() => setMenuOpen(false)} className="hover:text-green-600">Who It&apos;s For</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-green-600">Contact</a>
          <Link href="/login" className="text-green-700 font-semibold">Login</Link>
          <Link href="/register" className="bg-green-600 text-white text-center py-2 rounded-full hover:bg-green-700 transition">Get Started</Link>
        </div>
      )}
    </nav>
  );
}
