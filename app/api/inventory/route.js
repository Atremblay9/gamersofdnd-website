import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, discordName, email, itemName, details } = await req.json();

    // Create a new inventory request in the database
    const newRequest = await prisma.inventoryRequest.create({
      data: {
        name,
        discordName,
        email,
        itemName,
        details,
      },
    });

    return new Response(JSON.stringify({ newRequest }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to submit the request' }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    const inventory = await prisma.inventory.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    console.log("Fetched Inventory:", inventory);

    if (!inventory || inventory.length === 0) {
      throw new Error("No inventory found");
    }

    return new Response(JSON.stringify({ inventory }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return new Response(JSON.stringify({ error: 'Failed to fetch inventory' }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}


