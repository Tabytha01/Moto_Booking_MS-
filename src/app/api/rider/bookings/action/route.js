import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req) {
  const token = (await cookies()).get("token")?.value;
  const payload = token ? verifyToken(token) : null;

  if (!payload || payload.role !== "RIDER") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { bookingId, action } = await req.json();

    if (!bookingId || !action) {
      return NextResponse.json({ message: "Booking ID and action are required" }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) return NextResponse.json({ message: "Booking not found" }, { status: 404 });

    if (action === "ACCEPT") {
      if (booking.status !== "PENDING") {
        return NextResponse.json({ message: "This ride is no longer available" }, { status: 400 });
      }
      const updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: { riderId: payload.id, status: "ACCEPTED" },
      });
      return NextResponse.json({ message: "Ride accepted successfully", booking: updatedBooking });
    }

    if (action === "COMPLETE") {
      if (booking.status !== "ACCEPTED" || booking.riderId !== payload.id) {
        return NextResponse.json({ message: "You cannot complete this ride" }, { status: 400 });
      }
      const updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "COMPLETED" },
      });
      await prisma.riderProfile.update({
        where: { userId: payload.id },
        data: { totalRides: { increment: 1 } },
      });
      return NextResponse.json({ message: "Ride completed successfully", booking: updatedBooking });
    }

    if (action === "DECLINE") {
      return NextResponse.json({ message: "Ride declined" });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Booking action error:", error);
    return NextResponse.json({ message: "An error occurred during the booking action" }, { status: 500 });
  }
}
