import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  UserPlus, MapPin, CheckCircle, CreditCard,
  Zap, ShieldCheck, BarChart2, ClipboardList,
  Wallet, Settings, User, Bike, UserCog, ChevronDown,
} from "lucide-react";

export const metadata = {
  title: "MotoBook | Fast Motorcycle Transport Booking",
  description: "Book motorcycle rides instantly. Connecting customers with trusted riders.",
};

const steps = [
  { step: "01", title: "Create an Account", desc: "Sign up as a customer or rider in seconds. Fill in your details and you're ready to go.", icon: UserPlus },
  { step: "02", title: "Book a Ride", desc: "Enter your pickup and drop-off location, choose a time, and submit your booking request.", icon: MapPin },
  { step: "03", title: "Rider Accepts", desc: "A nearby rider receives your request and accepts it. You get notified instantly.", icon: Bike },
  { step: "04", title: "Ride & Pay", desc: "Your rider arrives, completes the trip, and you confirm the ride. Simple and fast.", icon: CheckCircle },
];

const features = [
  { icon: Zap, title: "Instant Booking", desc: "Book a ride in under a minute from anywhere, anytime." },
  { icon: ShieldCheck, title: "Secure & Trusted", desc: "All riders are verified. Your safety is our top priority." },
  { icon: BarChart2, title: "Live Tracking", desc: "Monitor your booking status in real time from your dashboard." },
  { icon: ClipboardList, title: "Booking History", desc: "Access all your past and current bookings in one place." },
  { icon: Wallet, title: "Rider Earnings", desc: "Riders can track daily and total earnings from their dashboard." },
  { icon: Settings, title: "Admin Control", desc: "Admins manage riders, customers, and all system activity." },
];

const roles = [
  {
    role: "Customer",
    icon: User,
    color: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-700",
    iconColor: "text-green-600",
    points: [
      "Register and log in securely",
      "Book rides with pickup & drop-off",
      "View booking status in real time",
      "Access full booking history",
    ],
  },
  {
    role: "Rider",
    icon: Bike,
    color: "bg-white border-green-300",
    badge: "bg-green-600 text-white",
    iconColor: "text-green-700",
    points: [
      "Receive and accept ride requests",
      "View assigned bookings",
      "Track daily and total earnings",
      "Manage your availability",
    ],
  },
  {
    role: "Admin",
    icon: UserCog,
    color: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-700",
    iconColor: "text-green-600",
    points: [
      "Manage all riders and customers",
      "Monitor all bookings system-wide",
      "Generate reports and analytics",
      "Control user access and roles",
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/moto.jpg"
            alt="Motorcycle rider on the road"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <span className="inline-block bg-green-600 text-white text-xs font-semibold px-4 py-1 rounded-full mb-4 uppercase tracking-widest">
            Motorcycle Transport System
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Your Ride, <span className="text-green-400">On Demand.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            MotoBook connects customers with trusted motorcycle riders for fast, affordable, and reliable transport across the city. Book in seconds, ride in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full transition text-base">
              Book a Ride Now
            </Link>
            <a href="#how-it-works" className="border border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-3 rounded-full transition text-base">
              See How It Works
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">How MotoBook Works</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Getting a ride is as easy as four simple steps. No calls, no waiting — just book and go.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="relative bg-green-50 border border-green-100 rounded-2xl p-6 text-center hover:shadow-md transition">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Icon className="w-7 h-7 text-green-600" />
                    </div>
                  </div>
                  <span className="absolute top-4 right-4 text-green-200 font-extrabold text-3xl">{s.step}</span>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">System Features</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Everything you need for a smooth, efficient, and transparent motorcycle transport experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-gray-100">
                  <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section id="roles" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">User Roles</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Who Is MotoBook For?</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              The system is designed for three types of users, each with a dedicated dashboard and set of tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.role} className={`rounded-2xl border p-8 ${r.color} hover:shadow-md transition`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <Icon className={`w-6 h-6 ${r.iconColor}`} />
                    </div>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${r.badge}`}>{r.role}</span>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {r.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section className="bg-green-600 py-14 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "500+", label: "Rides Completed" },
            { value: "50+", label: "Active Riders" },
            { value: "300+", label: "Happy Customers" },
            { value: "24/7", label: "System Availability" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-extrabold">{s.value}</p>
              <p className="text-sm mt-1 text-green-100">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8 text-base leading-relaxed">
            Join MotoBook today. Whether you need a ride or want to earn as a rider, we&apos;ve got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full transition">
              Create an Account
            </Link>
            <Link href="/login" className="border border-gray-500 text-gray-300 hover:border-white hover:text-white font-semibold px-8 py-3 rounded-full transition">
              Login
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
