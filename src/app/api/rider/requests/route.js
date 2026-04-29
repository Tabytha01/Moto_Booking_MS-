import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    // Fetch all PENDING bookings that don't have a rider assigned yet
    const requests = await prisma.booking.findMany({
      where: {
        status: "PENDING",
        riderId: null,
      },
      include: {
        customer: {
          select: {
            name: true,
            phone: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Fetch ride requests error:", error);
    return NextResponse.json(
      { message: "An error occurred fetching ride requests" },
      { status: 500 }
    );
  }
}
