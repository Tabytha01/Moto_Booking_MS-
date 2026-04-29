import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "User ID is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        riderProfile: true,
      },
    });

    if (!user || user.role !== "RIDER") {
      return NextResponse.json({ message: "Rider not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      profile: user.riderProfile,
    });
  } catch (error) {
    console.error("Fetch rider profile error:", error);
    return NextResponse.json(
      { message: "An error occurred fetching rider profile" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { userId, name, phone, licenseNumber, vehicleType } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    // Update User model
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        phone,
      },
    });

    // Update or Create RiderProfile
    const updatedProfile = await prisma.riderProfile.upsert({
      where: { userId: userId },
      update: {
        licenseNumber,
        vehicleType,
      },
      create: {
        userId: userId,
        licenseNumber,
        vehicleType,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        profile: updatedProfile,
      },
    });
  } catch (error) {
    console.error("Update rider profile error:", error);
    return NextResponse.json(
      { message: "An error occurred updating rider profile" },
      { status: 500 }
    );
  }
}
