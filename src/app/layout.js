import "./globals.css";

export const metadata = {
  title: "MotoBook | Motorcycle Transport Booking",
  description: "Fast, reliable motorcycle transport booking system.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
