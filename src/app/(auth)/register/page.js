import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "Register | Moto Booking MS" };

export default function RegisterPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Left Side - Image */}
      <div className="hidden md:block relative bg-green-600 h-screen">
        <Image
          src="/images/moto2.jpg"
          alt="Motorcycle"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center bg-white h-screen">
        <div className="w-full px-8">
          <h2 className="text-5xl font-bold text-green-600 mb-2">Create Account</h2>
          <p className="text-gray-700 text-lg mb-10">Join our community today</p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input 
                type="tel" 
                placeholder="+260 97X XXX XXX" 
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Register As</label>
              <select className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200">
                <option value="customer">Customer</option>
                <option value="rider">Rider</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
