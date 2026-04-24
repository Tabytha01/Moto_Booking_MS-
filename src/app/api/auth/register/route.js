import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  console.log("POST /api/auth/register request received");
  try {
    const { fullName, email, password, phone, role } = await req.json();

    // 1. Validation
    if (!fullName || !email || !password || !phone || !role) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // 2. Phone number validation (at most 10 digits as requested)
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length > 10) {
      return NextResponse.json(
        { message: "Phone number cannot exceed 10 digits" },
        { status: 400 }
      );
    }

    // 3. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create user and profile if rider
    const user = await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
        phone: cleanPhone,
        role: role.toUpperCase(),
        ...(role === "rider"
          ? {
              riderProfile: {
                create: {
                  isVerified: false,
                },
              },
            }
          : {}),
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user: { id: user.id, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
