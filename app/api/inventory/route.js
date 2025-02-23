import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function POST(request) {
  try {
    console.log("Received request:", request);
    
    const body = await request.json();
    console.log("Parsed JSON body:", body);

    if (!body || typeof body !== "object") {
      console.error("Invalid request payload");
      return new Response(JSON.stringify({ error: "Invalid request payload" }), { status: 400 });
    }

    const { id, name, edition, condition, quantity, type } = body;
    const quantityNum = Number(body.quantity);
if (isNaN(quantityNum)) {
  return new Response(JSON.stringify({ error: "Invalid quantity" }), { status: 400 });
}

    if (!name || !edition || isNaN(quantityNum) || !condition || !type) {
      console.error("Missing required fields:", body);
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    let result;

    if (id) {
      result = await prisma.inventory.update({
        where: { id: Number(id) },
        data: { name, edition, condition, quantity : quantityNum, type },
      });
    } else {
      result = await prisma.inventory.create({
        data: { name, edition, condition, quantity : quantityNum, type },
      });
    }

    console.log("Successfully added item:", result);
    return new Response(JSON.stringify(result), { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to add to inventory", details: error.message }), {
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

    console.log("Fetched Inventory");

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


