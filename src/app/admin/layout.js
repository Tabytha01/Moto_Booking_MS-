import Sidebar from "@/components/layout/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar role="admin" />
      <main className="flex-1 p-4 sm:p-6 lg:p-10 pt-20 lg:pt-10">{children}</main>
    </div>
  );
}
