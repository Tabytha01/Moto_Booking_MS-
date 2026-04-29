import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req) {
  const token = (await cookies()).get("token")?.value;
  const payload = token ? verifyToken(token) : null;

  if (!payload || payload.role !== "CUSTOMER") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { pickup, destination } = await req.json();

    if (!pickup || !destination) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        customerId: payload.id,
        pickup,
        destination,
        status: "PENDING",
        fare: Math.floor(Math.random() * 50) + 20,
      },
    });

    return NextResponse.json({ message: "Booking successful", booking }, { status: 201 });
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json({ message: "An error occurred while creating the booking" }, { status: 500 });
  }
}
