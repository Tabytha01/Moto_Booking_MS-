import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Count total riders (users with role RIDER)
    const totalRiders = await prisma.user.count({
      where: { role: "RIDER" },
    });

    // Count total customers
    const totalCustomers = await prisma.user.count({
      where: { role: "CUSTOMER" },
    });

    // Count bookings today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingsToday = await prisma.booking.count({
      where: {
        createdAt: { gte: today },
      },
    });

    // Count completed rides
    const completedRides = await prisma.booking.count({
      where: { status: "COMPLETED" },
    });

    // Get recent bookings
    const recentBookings = await prisma.booking.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        customer: { select: { id: true, name: true, phone: true } },
        rider: { select: { id: true, name: true, phone: true } },
      },
    });

    // Count unverified riders
    const unverifiedRiders = await prisma.riderProfile.count({
      where: { isVerified: false },
    });

    return NextResponse.json({
      stats: {
        totalRiders,
        totalCustomers,
        bookingsToday,
        completedRides,
      },
      recentBookings,
      unverifiedRiders,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json(
      { message: "An error occurred fetching admin dashboard data" },
      { status: 500 }
    );
  }
}
