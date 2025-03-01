import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    console.log("Received request:", request);

    // Check if the request body is empty
    if (!request.body) {
      console.error("Request body is empty");
      return new Response(JSON.stringify({ error: "Request body is empty" }), { status: 400 });
    }

    // Parse the request body
    const body = await request.json();
    console.log("Parsed JSON body:", body);

    // Validate the parsed body
    if (!body || typeof body !== "object") {
      console.error("Invalid request payload");
      return new Response(JSON.stringify({ error: "Invalid request payload" }), { status: 400 });
    }

    const { inventory_id, name, edition, condition, quantity, type } = body;
    const quantityNum = Number(quantity);

    if (isNaN(quantityNum)) {
      return new Response(JSON.stringify({ error: "Invalid quantity" }), { status: 400 });
    }

    if (!name || !edition || isNaN(quantityNum) || !condition || !type) {
      console.error("Missing required fields:", body);
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    let result;

    if (inventory_id) {
      // Update existing record
      result = await prisma.inventory.update({
        where: { id: Number(inventory_id) },
        data: { name, edition, condition, quantity: quantityNum, type },
      });
    } else {
      // Create new record (do not include `id` in the data)
      result = await prisma.inventory.create({
        data: { name, edition, condition, quantity: quantityNum, type },
      });
    }

    console.log("Successfully added/updated item:", result);
    return new Response(JSON.stringify(result), { status: 200 });

  } catch (error) {
    // Handle Prisma unique constraint errors
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      console.error("Unique constraint failed:", error.meta);
      return new Response(JSON.stringify({ 
        error: "Duplicate entry", 
        details: `A record with the same ID already exists: ${error.meta.target.join(', ')}`
      }), {
        status: 409, // Conflict status code
      });
    }

    // Handle other errors
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorDetails = error instanceof Error ? error.stack : null;

    console.error("API Error:", errorMessage, errorDetails);

    return new Response(JSON.stringify({ 
      error: "Failed to add/update inventory", 
      details: errorMessage 
    }), {
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
    console.error("Error fetching inventory");
    return new Response(JSON.stringify({ error: 'Failed to fetch inventory' }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}


export async function DELETE(request) {
  try {
    console.log("Received DELETE request:", request);

    // Parse the request body
    const body = await request.json();
    console.log("Parsed JSON body:", body);

    // Validate the parsed body
    if (!body || typeof body !== "object" || !body.id) {
      console.error("Invalid request payload");
      return new Response(JSON.stringify({ error: "Invalid request payload" }), { status: 400 });
    }

    const { id } = body;

    // Delete the inventory item
    const result = await prisma.inventory.delete({
      where: { id: Number(id) },
    });

    console.log("Successfully deleted item:", result);
    return new Response(JSON.stringify({ message: "Item deleted successfully", result }), {
      status: 200,
    });

  } catch (error) {
    // Handle Prisma errors
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      console.error("Record not found:", error.meta);
      return new Response(JSON.stringify({ 
        error: "Record not found", 
        details: `No inventory item found with ID: ${error.meta.target}`
      }), {
        status: 404, // Not Found status code
      });
    }

    // Handle other errors
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorDetails = error instanceof Error ? error.stack : null;

    console.error("API Error:", errorMessage, errorDetails);

    return new Response(JSON.stringify({ 
      error: "Failed to delete inventory item", 
      details: errorMessage 
    }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}

