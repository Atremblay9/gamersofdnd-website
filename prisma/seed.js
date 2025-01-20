const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Seed RunningGames table
  await prisma.runningGames.createMany({
    data: [
      {
        sessionName: 'The City In Between',
        format: '5e',
        DM: 'Alex',
        days: 'Wednesday/Friday',
        maxPlayers: 8,
      },
      {
        sessionName: 'Shadows of space',
        format: 'Pathfinder 2e',
        DM: 'Bryce',
        days: 'Wednesday',
        maxPlayers: 5,
      },
      {
        sessionName: 'Echoes in the Abyss',
        format: 'Call of Cthulhu',
        DM: 'Claire',
        days: 'Friday',
        maxPlayers: 4,
      },
      {
        sessionName: 'Arcane space',
        format: 'Ars Magica',
        DM: 'Danielle',
        days: 'Wednesday/Friday',
        maxPlayers: 6,
      },
    ],
  });

  // Seed GamePlayers table
  await prisma.gamePlayers.createMany({
    data: [
      { playerName: 'Alice', game_id: 1 },
      { playerName: 'Bob', game_id: 1 },
      { playerName: 'Charlie', game_id: 1 },
      { playerName: 'Diana', game_id: 1 },
      { playerName: 'Eve', game_id: 1 },
      { playerName: 'Frank', game_id: 2 },
      { playerName: 'Grace', game_id: 2 },
      { playerName: 'Hank', game_id: 2 },
      { playerName: 'Ivy', game_id: 3 },
      { playerName: 'Jack', game_id: 3 },
      { playerName: 'Kathy', game_id: 3 },
      { playerName: 'Leo', game_id: 3 },
      { playerName: 'Mona', game_id: 4 },
      { playerName: 'Nina', game_id: 4 },
    ],
  });
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
