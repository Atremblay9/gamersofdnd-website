"use client";

import CurrentGames from "@/components/currentGames";
import InventoryList from "@/components/inventoryList";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Function to check the user's country using ipapi
    const checkUserLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        if (data.country !== "CA") {
          console.log("User is not in Canada");
          // alert("Access Denied: This website is only available to users in Canada.");
          // // Optional: Redirect to an error page or disable functionality
          // window.location.href = "/error.html"; // Ensure you have an error page at this path
        } else {
          console.log("User is in Canada");
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        alert("Unable to verify your location. Please try again later.");
      }
    };

    checkUserLocation();
  }, []); // Empty dependency array ensures the check runs once on page load

  return (
    <div>
      <div className="hero-container">
        <p className="login">Admin</p>
        <h1>Gamers Of Dungeons and Dragons</h1>
      </div>
      <div className="description">
        <p>This is a Website created for Nait's Gamers of Dungeons and Dragons club. It's purpose is to support the club and aid in function.</p>
      </div>
      <div className="pills">
        <div className="currentGames-Container">
        <h3>Current Games</h3>
          <CurrentGames />
        </div>
        <div className="request-Container">
          <h3>Request for Game Component</h3>
        </div>
      </div>
      <div className="inventory">
        <div>
          <h3>Inventory</h3>
          <InventoryList />
        </div>

        <h3>Add to Inventory component</h3>
        
      </div>
    </div>
  );
}
