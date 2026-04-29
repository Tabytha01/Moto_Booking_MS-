import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET() {
  const token = (await cookies()).get("token")?.value;
  const payload = token ? verifyToken(token) : null;

  if (!payload || payload.role !== "RIDER") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    let user = await prisma.user.findUnique({
      where: { id: payload.id },
      include: { riderProfile: true },
    });

    if (!user) return NextResponse.json({ message: "Rider not found" }, { status: 404 });

    if (!user.riderProfile) {
      user.riderProfile = await prisma.riderProfile.create({
        data: { userId: payload.id, vehicleType: "Standard Moto" },
      });
    }

    const activeRides = await prisma.booking.findMany({
      where: { riderId: payload.id, status: "ACCEPTED" },
      include: { customer: { select: { name: true, phone: true } } },
      orderBy: { updatedAt: "desc" },
    });

    const completedRides = await prisma.booking.findMany({
      where: { riderId: payload.id, status: "COMPLETED" },
    });

    const totalEarnings = completedRides.reduce((sum, ride) => sum + (ride.fare || 0), 0);
    const ridesToday = completedRides.filter(
      (ride) => new Date(ride.updatedAt).toDateString() === new Date().toDateString()
    ).length;
    const earningsToday = completedRides
      .filter((ride) => new Date(ride.updatedAt).toDateString() === new Date().toDateString())
      .reduce((sum, ride) => sum + (ride.fare || 0), 0);

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, profile: user.riderProfile },
      stats: { ridesToday, totalRides: completedRides.length, earningsToday, totalEarnings, rating: user.riderProfile.rating },
      activeRides,
    });
  } catch (error) {
    console.error("Rider dashboard error:", error);
    return NextResponse.json({ message: "An error occurred fetching rider dashboard data" }, { status: 500 });
  }
}
