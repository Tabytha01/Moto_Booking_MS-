const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const pg = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting seeding...");

  const adminEmail = "admin@motobook.com";
  const adminPassword = "admin123";
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "System Admin",
      password: hashedAdminPassword,
      role: "ADMIN",
    },
  });

  console.log(" Admin user created/updated:", admin.email);

  const customersData = [
    {
      email: "john@example.com",
      name: "John Doe",
      phone: "+250971234567",
      password: "password123",
    },
    {
      email: "jane@example.com",
      name: "Jane Smith",
      phone: "+250979876543",
      password: "password123",
    },
  ];

  const customers = [];
  for (const customerData of customersData) {
    const hashedPassword = await bcrypt.hash(customerData.password, 10);
    const customer = await prisma.user.upsert({
      where: { email: customerData.email },
      update: {},
      create: {
        ...customerData,
        password: hashedPassword,
        role: "CUSTOMER",
      },
    });
    customers.push(customer);
  }
  console.log(" Customers created:", customers.length);

  const ridersData = [
    {
      email: "mike@motobook.com",
      name: "Mike Rider",
      phone: "+250975555555",
      password: "rider123",
      licenseNumber: "RAI 976 Q",
      vehicleType: "Motorcycle",
      isVerified: true,
    },
    {
      email: "sarah@motobook.com",
      name: "Sarah Rider",
      phone: "+250976666666",
      password: "rider123",
      licenseNumber: "RAD 345 U",
      vehicleType: "Motorcycle",
      isVerified: false,
    },
    {
      email: "david@motobook.com",
      name: "David Rider",
      phone: "+250977777777",
      password: "rider123",
      licenseNumber: "RAA 234 R",
      vehicleType: "Spiro",
      isVerified: true,
    },
  ];

  const riders = [];
  for (const riderData of ridersData) {
    const hashedPassword = await bcrypt.hash(riderData.password, 10);
    const rider = await prisma.user.upsert({
      where: { email: riderData.email },
      update: {},
      create: {
        email: riderData.email,
        name: riderData.name,
        phone: riderData.phone,
        password: hashedPassword,
        role: "RIDER",
        riderProfile: {
          create: {
            licenseNumber: riderData.licenseNumber,
            vehicleType: riderData.vehicleType,
            isVerified: riderData.isVerified,
          },
        },
      },
      include: {
        riderProfile: true,
      },
    });
    riders.push(rider);
  }
  console.log(" Riders created:", riders.length);

  const bookingsData = [
    {
      customer: customers[0],
      rider: riders[0],
      pickup: "Kigali Heights, Kigali",
      destination: "Union Trade Centre (UTC), Kigali",
      fare: 25.0,
      status: "COMPLETED",
    },
    {
      customer: customers[1],
      rider: riders[2],
      pickup: "Nyarutarama, Kigali",
      destination: "University of Rwanda, Kigali",
      fare: 18.5,
      status: "ACCEPTED",
    },
    {
      customer: customers[0],
      rider: null,
      pickup: "Kimironko Market, Kigali",
      destination: "Gishushu, Kigali",
      fare: 30.0,
      status: "PENDING",
    },
    {
      customer: customers[1],
      rider: riders[0],
      pickup: "Rwanda Revenue Authority (RRA), Kigali",
      destination: "Remera, Kigali",
      fare: 15.0,
      status: "COMPLETED",
    },
  ];

  for (const bookingData of bookingsData) {
    await prisma.booking.create({
      data: {
        customerId: bookingData.customer.id,
        riderId: bookingData.rider?.id,
        pickup: bookingData.pickup,
        destination: bookingData.destination,
        fare: bookingData.fare,
        status: bookingData.status,
      },
    });
  }
  console.log(" Bookings created:", bookingsData.length);

  console.log("\n-----------------------------------");
  console.log("Default Credentials:");
  console.log("-----------------------------------");
  console.log("ADMIN:");
  console.log("  Email:", adminEmail);
  console.log("  Password:", adminPassword);
  console.log("\nCUSTOMERS:");
  customers.forEach((c) => {
    console.log(`  ${c.name} (${c.email}): password123`);
  });
  console.log("\nRIDERS:");
  riders.forEach((r) => {
    console.log(`  ${r.name} (${r.email}): rider123`);
    console.log(`    Status: ${r.riderProfile?.isVerified ? "VERIFIED" : "PENDING"}`);
  });
  console.log("-----------------------------------");
  console.log(" Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
