import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET() {
  const token = (await cookies()).get("token")?.value;
  const payload = token ? verifyToken(token) : null;

  if (!payload || payload.role !== "CUSTOMER") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const bookings = await prisma.booking.findMany({
      where: { customerId: payload.id },
      include: { rider: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return NextResponse.json({ user, bookings });
  } catch (error) {
    console.error("Dashboard data error:", error);
    return NextResponse.json({ message: "An error occurred fetching dashboard data" }, { status: 500 });
  }
}
