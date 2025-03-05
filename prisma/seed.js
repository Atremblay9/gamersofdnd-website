const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Seed RunningGames table
  await prisma.runningGames.createMany({
    data: [
      {
        sessionName: 'The City In Between',
        format: '5e',
        DM: 'Josh',
        days: 'Wednesday',
        maxPlayers: 7,
      },
      {
        sessionName: 'Legacy of the Ancients',
        format: 'Pathfinder1E',
        DM: 'Kris',
        days: 'Wednesday',
        maxPlayers: 9,
      },
      {
        sessionName: 'Lightning Key',
        format: '5e',
        DM: 'Ti-moth',
        days: 'Every other Friday',
        maxPlayers: 6,
      }

    ],
  });

  // Seed GamePlayers table
  await prisma.gamePlayers.createMany({
    data: [
      { playerName: 'Cody', game_id: 1 },
      { playerName: 'Katie', game_id: 1 },
      { playerName: 'Styles', game_id: 1 },
      { playerName: 'Sam', game_id: 1 },
      { playerName: 'Sam 2', game_id: 1 },
      { playerName: 'Judah', game_id: 1 },
      { playerName: 'Amélie', game_id: 1 },
      { playerName: 'Aldous', game_id: 2 },
      { playerName: 'Alexander', game_id: 2 },

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
