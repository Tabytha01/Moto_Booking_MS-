import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "User ID is required" }, { status: 400 });
  }

  try {
    // 1. Fetch user info
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 2. Fetch recent bookings
    const bookings = await prisma.booking.findMany({
      where: { customerId: userId },
      include: {
        rider: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5, // Last 5 rides
    });

    return NextResponse.json({
      user,
      bookings,
    });
  } catch (error) {
    console.error("Dashboard data error:", error);
    return NextResponse.json(
      { message: "An error occurred fetching dashboard data" },
      { status: 500 }
    );
  }
}
