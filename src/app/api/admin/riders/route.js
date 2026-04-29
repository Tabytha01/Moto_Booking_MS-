import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const riders = await prisma.user.findMany({
      where: { role: "RIDER" },
      include: { riderProfile: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ riders });
  } catch (error) {
    console.error("Admin riders error:", error);
    return NextResponse.json(
      { message: "An error occurred fetching riders" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { riderId, isVerified } = await req.json();

    if (!riderId) {
      return NextResponse.json({ message: "Rider ID is required" }, { status: 400 });
    }

    const updatedRider = await prisma.riderProfile.upsert({
      where: { userId: riderId },
      update: { isVerified },
      create: {
        userId: riderId,
        isVerified,
      },
    });

    return NextResponse.json({
      message: "Rider updated successfully",
      rider: updatedRider,
    });
  } catch (error) {
    console.error("Update rider error:", error);
    return NextResponse.json(
      { message: "An error occurred updating rider" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const riderId = searchParams.get("riderId");

    if (!riderId) {
      return NextResponse.json({ message: "Rider ID is required" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: riderId },
    });

    return NextResponse.json({ message: "Rider deleted successfully" });
  } catch (error) {
    console.error("Delete rider error:", error);
    return NextResponse.json(
      { message: "An error occurred deleting rider" },
      { status: 500 }
    );
  }
}
