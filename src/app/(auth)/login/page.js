import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      {/* LEFT SIDE - IMAGE */}
      <div className="w-full md:w-1/2 relative h-64 md:h-auto">
        <Image
          src="/images/moto1.jpg"
          alt="Motorcycle"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-8">

          <h2 className="text-4xl font-bold text-green-600 mb-2">
            Welcome Back 
          </h2>
          <p className="text-gray-600 mb-8">
            Sign in to continue
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Login As
              </label>
              <select className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="customer">Customer</option>
                <option value="rider">Rider</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-green-600 font-semibold">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}