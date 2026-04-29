import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "User ID is required" }, { status: 400 });
  }

  try {
    // 1. Fetch user and rider profile
    let user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        riderProfile: true,
      },
    });

    if (!user || user.role !== "RIDER") {
      return NextResponse.json({ message: "Rider not found" }, { status: 404 });
    }

    // Lazy create rider profile if it doesn't exist
    if (!user.riderProfile) {
      user.riderProfile = await prisma.riderProfile.create({
        data: {
          userId: userId,
          vehicleType: "Standard Moto",
        },
      });
    }

    // 2. Fetch active rides (ACCEPTED status)
    const activeRides = await prisma.booking.findMany({
      where: {
        riderId: userId,
        status: "ACCEPTED",
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
        updatedAt: "desc",
      },
    });

    // 3. Calculate stats
    const completedRides = await prisma.booking.findMany({
      where: {
        riderId: userId,
        status: "COMPLETED",
      },
    });

    const totalEarnings = completedRides.reduce((sum, ride) => sum + (ride.fare || 0), 0);
    const ridesToday = completedRides.filter(ride => 
      new Date(ride.updatedAt).toDateString() === new Date().toDateString()
    ).length;

    const earningsToday = completedRides
      .filter(ride => new Date(ride.updatedAt).toDateString() === new Date().toDateString())
      .reduce((sum, ride) => sum + (ride.fare || 0), 0);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.riderProfile,
      },
      stats: {
        ridesToday,
        totalRides: completedRides.length,
        earningsToday,
        totalEarnings,
        rating: user.riderProfile.rating,
      },
      activeRides,
    });
  } catch (error) {
    console.error("Rider dashboard error:", error);
    return NextResponse.json(
      { message: "An error occurred fetching rider dashboard data" },
      { status: 500 }
    );
  }
}
