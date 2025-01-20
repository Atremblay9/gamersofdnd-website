-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "edition" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "type" TEXT,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RunningGames" (
    "id" SERIAL NOT NULL,
    "sessionName" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "DM" TEXT NOT NULL,
    "days" TEXT NOT NULL,
    "maxPlayers" INTEGER NOT NULL,

    CONSTRAINT "RunningGames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamePlayers" (
    "id" SERIAL NOT NULL,
    "playerName" TEXT NOT NULL,
    "game_id" INTEGER NOT NULL,

    CONSTRAINT "GamePlayers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GamePlayers" ADD CONSTRAINT "GamePlayers_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "RunningGames"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
