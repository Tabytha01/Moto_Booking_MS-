import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { customerId, pickup, destination } = await req.json();

    if (!customerId || !pickup || !destination) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new booking
    const booking = await prisma.booking.create({
      data: {
        customerId,
        pickup,
        destination,
        status: "PENDING",
        fare: Math.floor(Math.random() * 50) + 20, // Dummy fare calculation
      },
    });

    return NextResponse.json(
      { message: "Booking successful", booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the booking" },
      { status: 500 }
    );
  }
}
