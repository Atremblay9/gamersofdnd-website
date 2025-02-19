import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const game_id = url.searchParams.get("game_id");

    if (!game_id) {
      return new Response(JSON.stringify({ error: 'Missing game_id' }), { status: 400 });
    }

    const currentGamePlayers = await prisma.gamePlayers.findMany({
      where: { game_id: Number(game_id) },
      orderBy: { id: 'asc' },
    });

    console.log('Fetched Game Players', currentGamePlayers);
    return new Response(JSON.stringify({ currentGamePlayers }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch game players' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
