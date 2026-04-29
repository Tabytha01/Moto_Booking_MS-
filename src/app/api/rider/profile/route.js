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
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      include: { riderProfile: true },
    });

    if (!user) return NextResponse.json({ message: "Rider not found" }, { status: 404 });

    return NextResponse.json({
      id: user.id, name: user.name, email: user.email, phone: user.phone, profile: user.riderProfile,
    });
  } catch (error) {
    console.error("Fetch rider profile error:", error);
    return NextResponse.json({ message: "An error occurred fetching rider profile" }, { status: 500 });
  }
}

export async function PUT(req) {
  const token = (await cookies()).get("token")?.value;
  const payload = token ? verifyToken(token) : null;

  if (!payload || payload.role !== "RIDER") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, phone, licenseNumber, vehicleType } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: payload.id },
      data: { name, phone },
    });

    const updatedProfile = await prisma.riderProfile.upsert({
      where: { userId: payload.id },
      update: { licenseNumber, vehicleType },
      create: { userId: payload.id, licenseNumber, vehicleType },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      user: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email, phone: updatedUser.phone, profile: updatedProfile },
    });
  } catch (error) {
    console.error("Update rider profile error:", error);
    return NextResponse.json({ message: "An error occurred updating rider profile" }, { status: 500 });
  }
}
