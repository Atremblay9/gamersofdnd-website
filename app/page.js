"use client";

import CurrentGames from "@/components/currentGames";
import InventoryList from "@/components/inventoryList";
import InventoryRequest from "@/components/inventoryRequest";
import ModalFormButton from "@/components/ModalFormButton";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

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

  const router = useRouter();
  const goToDashboard = () => {
    router.push('/dashboard');
  }

  return (
    <div>
      <div className="hero-container">
        <button className="login" onClick={goToDashboard}>Admin</button>
        <h1>Gamers Of Dungeons and Dragons</h1>
        <div className="description">
        <p>This is a Website created for Nait's Gamers of Dungeons and Dragons club. It's purpose is to support the club and aid in function.</p>
      </div>
      </div>
      
      <div className="pills">
        <div className="currentGames-Container">
          <div className="currentGames-header">
            <h3>Current Games</h3>
            <ModalFormButton />
          </div>
          <CurrentGames isDashboard={false}/>
        </div>
      </div>
      <div className="inventory">
        <div className="inventory-container">
          <h3>Inventory</h3>
          <InventoryList />
        </div>
        <div className="add-to-inventory">
          <h3>Add to Inventory</h3>
          <InventoryRequest />
        </div>
      </div>
    </div>
  );
}
