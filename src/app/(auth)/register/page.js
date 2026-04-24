"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Phone, ArrowRight, Bike, ShieldCheck, Zap, UserCircle } from "lucide-react";

export default function RegisterPage() {
  const [role, setRole] = useState("customer");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Phone number validation (digits only, max 10)
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length > 10) {
      setError("Phone number cannot exceed 10 digits");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response received:", text);
        throw new Error(`Server returned an unexpected response (Status: ${res.status}). This often happens if the server is running on a different port (like 3001) but you are using 3000.`);
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Success - Redirect to login page instead of dashboard
      router.push("/login?registered=true");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left Side: Visual/Branding */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-green-600/20 via-transparent to-transparent opacity-50" />
        
        {/* Logo/Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
            <Bike className="text-white w-7 h-7" />
          </div>
          <span className="text-white font-black text-2xl tracking-tight">MotoBook</span>
        </div>

        {/* Hero Text */}
        <div className="relative z-10">
          <h1 className="text-6xl font-black text-white leading-tight mb-6">
            Start Your <br />
            <span className="text-green-500 text-glow">Journey</span> With Us.
          </h1>
          <p className="text-gray-400 text-xl font-medium max-w-md leading-relaxed">
            Join the community of thousands of riders and customers who trust us every day.
          </p>
        </div>

        {/* Glassmorphism Panel */}
        <div className="relative z-10 grid grid-cols-2 gap-6 bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10">
          <div>
            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mb-3">
              <Zap className="text-green-500 w-5 h-5" />
            </div>
            <p className="text-white font-black text-2xl">99%</p>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Satisfaction</p>
          </div>
          <div>
            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mb-3">
              <ShieldCheck className="text-green-500 w-5 h-5" />
            </div>
            <p className="text-white font-black text-2xl">24/7</p>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Support</p>
          </div>
        </div>

        {/* Large Background Graphic */}
        <div className="absolute -right-20 -bottom-20 opacity-5 rotate-12">
           <Bike className="w-[600px] h-[600px] text-white" />
        </div>
      </div>

      {/* Right Side: Register Form */}
      <div className="flex items-center justify-center p-8 lg:p-16 bg-gray-50/50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Create Account</h2>
            <p className="text-gray-500 font-medium">Join the MotoBook family today.</p>
          </div>

          {/* Role Selection */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setRole("customer")}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                role === "customer"
                  ? "border-green-500 bg-white shadow-lg shadow-green-500/10"
                  : "border-transparent bg-gray-100/50 hover:bg-gray-100"
              }`}
            >
              <div className={`p-2 rounded-xl ${role === "customer" ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-400"}`}>
                <UserCircle className="w-6 h-6" />
              </div>
              <span className={`text-sm font-bold ${role === "customer" ? "text-gray-900" : "text-gray-500"}`}>Customer</span>
            </button>
            <button
              onClick={() => setRole("rider")}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                role === "rider"
                  ? "border-green-500 bg-white shadow-lg shadow-green-500/10"
                  : "border-transparent bg-gray-100/50 hover:bg-gray-100"
              }`}
            >
              <div className={`p-2 rounded-xl ${role === "rider" ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-400"}`}>
                <Bike className="w-6 h-6" />
              </div>
              <span className={`text-sm font-bold ${role === "rider" ? "text-gray-900" : "text-gray-500"}`}>Rider</span>
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-widest">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all duration-200"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-widest">
                  Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+250 7xx xxx xxx"
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@example.com"
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-widest">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all duration-200"
                />
              </div>
            </div>

            {role === "rider" && (
              <div className="p-4 bg-green-50 rounded-2xl border border-green-100 animate-in fade-in slide-in-from-top-2">
                <p className="text-xs font-bold text-green-800 uppercase tracking-widest mb-1">Rider Verification</p>
                <p className="text-xs text-green-700/80">By registering as a Rider, you agree to undergo our background check and document verification process.</p>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full group relative flex justify-center py-4 px-4 border border-transparent rounded-2xl text-white bg-gray-900 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all duration-300 shadow-xl shadow-gray-200 hover:shadow-green-500/20 overflow-hidden ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                <span className="relative z-10 font-black text-lg flex items-center gap-2">
                  {isLoading ? (
                    "Creating Account..."
                  ) : (
                    <>Join as {role.charAt(0).toUpperCase() + role.slice(1)} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </span>
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-gray-500 font-medium">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-green-600 font-black hover:text-green-700 relative group"
              >
                Login here
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

