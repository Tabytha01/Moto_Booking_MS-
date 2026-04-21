import Sidebar from "@/components/layout/Sidebar";

export default function RiderLayout({ children }) {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar role="rider" />
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
