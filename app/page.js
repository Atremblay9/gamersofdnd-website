"use client";

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
        <h3>Current Games Component</h3>
        <h3>Request for Game Component</h3>
      </div>
      <div className="inventory">
        <h3>Search current Inventory component</h3>
        <h3>Add to Inventory component</h3>
        
      </div>
    </div>
  );
}
