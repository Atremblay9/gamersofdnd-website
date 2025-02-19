"use client";

import CurrentGames from "@/components/currentGames";
import InventoryList from "@/components/inventoryList";


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
        <div className="inventory">
          <div className="inventory-container">
            <div className="inventory-header">
              <h3>Inventory</h3>
              <button>Add to Inventory</button>
            </div>
            <InventoryList />
          </div>
        </div>
      </div>
    </div>
  );
}
