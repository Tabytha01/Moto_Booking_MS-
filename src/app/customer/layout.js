import Sidebar from "@/components/layout/Sidebar";

export default function CustomerLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar role="customer" />
      <main className="flex-1 p-8 bg-gray-50 min-h-screen">{children}</main>
    </div>
  );
}
