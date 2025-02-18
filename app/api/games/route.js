import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch current running games from the database
    const currentRunningGames = await prisma.runningGames.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    return new Response(JSON.stringify({ currentRunningGames }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch games' }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
