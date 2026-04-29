"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, ArrowRight, Bike, ShieldCheck, Users, UserCog, CheckCircle2 } from "lucide-react";

function LoginContent() {
  const [role, setRole] = useState("customer"); // customer, rider, admin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("registered")) {
      setSuccess("Account created successfully! Please log in.");
    }
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response received:", text);
        throw new Error(`Server returned an unexpected response (Status: ${res.status}). This often happens if the server is running on a different port (like 3001) but you are using 3000.`);
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Success - Redirect to the appropriate dashboard based on role
      if (role === "admin") {
        router.push("/admin/dashboard");
      } else if (role === "rider") {
        router.push("/rider/dashboard");
      } else {
        router.push("/customer/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left Side: Visual/Branding */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-transparent to-transparent" />
        
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
            Ride the <span className="text-green-500 text-glow">Future</span> <br />
            of Transport.
          </h1>
          <p className="text-gray-400 text-xl font-medium max-w-md leading-relaxed">
            The fastest way to navigate the city. Reliable, safe, and always ready when you are.
          </p>
        </div>

        {/* Social Proof/Stats */}
        <div className="relative z-10 flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <Users className="text-green-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">10k+</p>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Active Riders</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <ShieldCheck className="text-green-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">100%</p>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Secure Trips</p>
            </div>
          </div>
        </div>

        {/* Large Background Graphic */}
        <div className="absolute -right-20 bottom-0 opacity-10 rotate-12">
           <Bike className="w-[600px] h-[600px] text-white" />
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex items-center justify-center p-8 lg:p-24 bg-gray-50/50">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Welcome Back</h2>
            <p className="text-gray-500 font-medium">Please enter your details to sign in.</p>
          </div>

          {/* Role Selection Tabs */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-50 border border-green-100 rounded-2xl text-green-600 text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-4 h-4" />
              {success}
            </div>
          )}
          <div className="flex p-1 bg-gray-200/50 rounded-2xl">
            {["customer", "rider", "admin"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-3 px-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                  role === r
                    ? "bg-white text-green-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">
                {role.charAt(0).toUpperCase() + role.slice(1)} Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  {role === "admin" ? (
                    <UserCog className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                  ) : (
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                  )}
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={role === "admin" ? "admin@motobook.com" : "name@example.com"}
                  className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <Link href="#" className="text-xs font-bold text-green-600 hover:text-green-700">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all duration-200"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full group relative flex justify-center py-4 px-4 border border-transparent rounded-2xl text-white bg-gray-900 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all duration-300 shadow-xl shadow-gray-200 hover:shadow-green-500/20 overflow-hidden ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <span className="relative z-10 font-black text-lg flex items-center gap-2">
                {isLoading ? (
                  "Signing In..."
                ) : (
                  <>Sign In as {role.charAt(0).toUpperCase() + role.slice(1)} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </span>
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-gray-500 font-medium">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-green-600 font-black hover:text-green-700 relative group"
              >
                Sign Up
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}

