import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { bookingId, riderId, action } = await req.json();

    if (!bookingId || !riderId || !action) {
      return NextResponse.json(
        { message: "Booking ID, Rider ID, and action are required" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    if (action === "ACCEPT") {
      if (booking.status !== "PENDING") {
        return NextResponse.json(
          { message: "This ride is no longer available" },
          { status: 400 }
        );
      }

      const updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: {
          riderId: riderId,
          status: "ACCEPTED",
        },
      });

      return NextResponse.json({
        message: "Ride accepted successfully",
        booking: updatedBooking,
      });
    }

    if (action === "COMPLETE") {
      if (booking.status !== "ACCEPTED" || booking.riderId !== riderId) {
        return NextResponse.json(
          { message: "You cannot complete this ride" },
          { status: 400 }
        );
      }

      const updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: {
          status: "COMPLETED",
        },
      });

      // Update rider stats
      await prisma.riderProfile.update({
        where: { userId: riderId },
        data: {
          totalRides: { increment: 1 },
        },
      });

      return NextResponse.json({
        message: "Ride completed successfully",
        booking: updatedBooking,
      });
    }

    if (action === "DECLINE") {
      // For now, we just return success. 
      // In a real app, we would track that this rider declined this booking.
      return NextResponse.json({
        message: "Ride declined",
      });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Booking action error:", error);
    return NextResponse.json(
      { message: "An error occurred during the booking action" },
      { status: 500 }
    );
  }
}
