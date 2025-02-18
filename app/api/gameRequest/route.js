import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, format, days, experience, email, discord} = await req.json();

    // Create a new inventory request in the database
    const newRequest = await prisma.gameRequest.create({
      data: {
      name,
      format,
      days,
      experience,
      email,
      discord,
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
    // Fetch current running games from the database
    const gameRequests = await prisma.gameRequest.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    return new Response(JSON.stringify({ gameRequests }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch game requests' }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
