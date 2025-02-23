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



export async function POST(request) {
  try {
    const { game_id, gameName, status } = await request.json();

    if (!gameName || !status) {
      return new Response(
        JSON.stringify({ error: 'Missing gameName or status' }),
        { status: 400 }
      );
    }

    let result;

    if (game_id) {
      // 🔹 Update existing game
      result = await prisma.runningGames.update({
        where: { id: Number(game_id) },
        data: { gameName, status },
      });
    } else {
      // 🔹 Create new game
      result = await prisma.runningGames.create({
        data: { gameName, status },
      });
    }

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to process game request' }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}