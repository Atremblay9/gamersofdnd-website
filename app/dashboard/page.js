"use client";

import CurrentGames from "@/components/currentGames";
import GameRequestAdmin from "@/components/gameRequestAdmin";
import InventoryListAdmin from "@/components/inventoryListAdmin";
import InventoryRequestAdmin from "@/components/inventoryRequestAdmin";


export default function Home() {

  
  
  
  return (
    <div>
      <div className="hero-container">
        <button className="login">LogOut</button>
        <h1>Gamers Of Dungeons and Dragons</h1>
        <div className="description">
          <p>Welcome to the Admin Page, here you can modify/track inventory and running games!</p>
        </div>
      </div>
      <div>
        <div className="pills">
          <div className="currentGames-Container">
            <div className="currentGames-header">
              <h3>Current Games</h3>
              <button>Add Game</button>
            </div>
            <CurrentGames isDashboard={true} />
          </div>
        </div>
        <div className="gameRequestAdmin">
          <div className="gameRequestAdmin-container">
            <h3>Game Request Admin</h3>
            <GameRequestAdmin />
          </div>
        </div>
        <div className="inventory">
          <div className="inventory-container">

            <InventoryListAdmin />
          </div>
        </div>
                <div className="inventoryRequestAdmin">
          <div className="inventoryRequestAdmin-container">
            <h3>Inventory Request Admin</h3>
            <InventoryRequestAdmin />
          </div>
        </div>
      </div>
    </div>
  );
}
