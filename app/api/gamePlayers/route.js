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

    return new Response(JSON.stringify({ currentGamePlayers }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch game players' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request) {
  try {
    const { game_id, playerName } = await request.json();

    if (!game_id || !playerName) {
      return new Response(JSON.stringify({ error: 'Missing data' }), { status: 400 });
    }

    const result = await prisma.gamePlayers.create({
      data: { game_id: Number(game_id), playerName },
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to add player' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing data' }), { status: 400 });
    }

    const result = await prisma.gamePlayers.delete({
      where: { id: Number(id) },
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to delete player' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}