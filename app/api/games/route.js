import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch current running games from the database
    const currentRunningGames = await prisma.runningGames.findMany({
      where: {
        archived: false,
      },
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
    const { id, sessionName, format, DM, days, maxPlayers, archived } = await request.json();

    if (archived === undefined) {
      return new Response(
        JSON.stringify({ error: 'Missing data' }),
        { status: 400 }
      );
    }

    let result;

    if (id) {
      // 🔹 Update existing game
      result = await prisma.runningGames.update({
        where: { id: Number(id) },
        data: { sessionName, format, DM, days, maxPlayers: Number(maxPlayers), archived },
      });
    } else {
      // 🔹 Create new game
      result = await prisma.runningGames.create({
        data: {sessionName, format, DM, days, maxPlayers: Number(maxPlayers), archived},
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