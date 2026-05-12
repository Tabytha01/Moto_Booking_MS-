import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get("type") || "bookings";
    const dateRange = searchParams.get("range") || "all";

    // Calculate date filter
    const dateFilter = getDateFilter(dateRange);

    let reportData;
    let filename;

    switch (reportType) {
      case "bookings":
        reportData = await generateBookingsReport(dateFilter);
        filename = `bookings-report-${new Date().toISOString().split('T')[0]}.csv`;
        break;
      case "riders":
        reportData = await generateRidersReport();
        filename = `riders-report-${new Date().toISOString().split('T')[0]}.csv`;
        break;
      case "customers":
        reportData = await generateCustomersReport();
        filename = `customers-report-${new Date().toISOString().split('T')[0]}.csv`;
        break;
      case "revenue":
        reportData = await generateRevenueReport(dateFilter);
        filename = `revenue-report-${new Date().toISOString().split('T')[0]}.csv`;
        break;
      default:
        return NextResponse.json({ message: "Invalid report type" }, { status: 400 });
    }

    // Convert to CSV
    const csv = convertToCSV(reportData);

    // Return CSV file
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Report generation error:", error);
    return NextResponse.json(
      { message: "Failed to generate report" },
      { status: 500 }
    );
  }
}

function getDateFilter(range) {
  const now = new Date();
  let startDate;

  switch (range) {
    case "today":
      startDate = new Date(now.setHours(0, 0, 0, 0));
      break;
    case "week":
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case "month":
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
    case "all":
    default:
      return {};
  }

  return { createdAt: { gte: startDate } };
}

async function generateBookingsReport(dateFilter) {
  const bookings = await prisma.booking.findMany({
    where: dateFilter,
    include: {
      customer: { select: { name: true, email: true, phone: true } },
      rider: { select: { name: true, email: true, phone: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return bookings.map((booking) => ({
    "Booking ID": booking.id,
    "Customer Name": booking.customer?.name || "N/A",
    "Customer Email": booking.customer?.email || "N/A",
    "Customer Phone": booking.customer?.phone || "N/A",
    "Rider Name": booking.rider?.name || "Not Assigned",
    "Rider Email": booking.rider?.email || "N/A",
    "Rider Phone": booking.rider?.phone || "N/A",
    "Pickup Location": booking.pickup,
    "Destination": booking.destination,
    "Fare (RWF)": booking.fare || 0,
    "Status": booking.status,
    "Created At": new Date(booking.createdAt).toLocaleString(),
    "Updated At": new Date(booking.updatedAt).toLocaleString(),
  }));
}

async function generateRidersReport() {
  const riders = await prisma.user.findMany({
    where: { role: "RIDER" },
    include: {
      riderProfile: true,
      riderBookings: {
        where: { status: "COMPLETED" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return riders.map((rider) => {
    const totalEarnings = rider.riderBookings.reduce(
      (sum, booking) => sum + (booking.fare || 0),
      0
    );

    return {
      "Rider ID": rider.id,
      "Name": rider.name || "N/A",
      "Email": rider.email,
      "Phone": rider.phone || "N/A",
      "License Number": rider.riderProfile?.licenseNumber || "N/A",
      "Vehicle Type": rider.riderProfile?.vehicleType || "N/A",
      "Verified": rider.riderProfile?.isVerified ? "Yes" : "No",
      "Rating": rider.riderProfile?.rating?.toFixed(1) || "0.0",
      "Total Rides": rider.riderProfile?.totalRides || 0,
      "Total Earnings (RWF)": totalEarnings.toFixed(2),
      "Registered At": new Date(rider.createdAt).toLocaleString(),
    };
  });
}

async function generateCustomersReport() {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    include: {
      customerBookings: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return customers.map((customer) => {
    const totalSpent = customer.customerBookings.reduce(
      (sum, booking) => sum + (booking.fare || 0),
      0
    );

    return {
      "Customer ID": customer.id,
      "Name": customer.name || "N/A",
      "Email": customer.email,
      "Phone": customer.phone || "N/A",
      "Total Bookings": customer.customerBookings.length,
      "Completed Rides": customer.customerBookings.filter(b => b.status === "COMPLETED").length,
      "Total Spent (RWF)": totalSpent.toFixed(2),
      "Registered At": new Date(customer.createdAt).toLocaleString(),
    };
  });
}

async function generateRevenueReport(dateFilter) {
  const bookings = await prisma.booking.findMany({
    where: {
      ...dateFilter,
      status: "COMPLETED",
    },
    include: {
      customer: { select: { name: true } },
      rider: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.fare || 0), 0);

  const report = bookings.map((booking) => ({
    "Booking ID": booking.id,
    "Date": new Date(booking.createdAt).toLocaleDateString(),
    "Time": new Date(booking.createdAt).toLocaleTimeString(),
    "Customer": booking.customer?.name || "N/A",
    "Rider": booking.rider?.name || "N/A",
    "Pickup": booking.pickup,
    "Destination": booking.destination,
    "Fare (RWF)": booking.fare?.toFixed(2) || "0.00",
  }));

  // Add summary row
  report.push({
    "Booking ID": "",
    "Date": "",
    "Time": "",
    "Customer": "",
    "Rider": "",
    "Pickup": "",
    "Destination": "TOTAL REVENUE:",
    "Fare (RWF)": totalRevenue.toFixed(2),
  });

  return report;
}

function convertToCSV(data) {
  if (!data || data.length === 0) {
    return "No data available";
  }

  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Add header row
  csvRows.push(headers.join(","));

  // Add data rows
  for (const row of data) {
    const values = headers.map((header) => {
      const value = row[header];
      // Escape commas and quotes in values
      const escaped = ("" + value).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
}
