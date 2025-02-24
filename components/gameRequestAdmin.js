import { useEffect, useState } from "react"


export default function GameRequestAdmin() {
const [requests, setRequests] = useState([]);

useEffect(() => {
  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/gameRequest');
      if (!response.ok) {
        throw new Error('Failed to fetch requests');
      }
      const data = await response.json();
      setRequests(Array.isArray(data.gameRequests) ? data.gameRequests : Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  fetchRequests();
}, []);


return (
  <div >
    <ul >
      {requests &&requests.map((request) => (
        <li className="gameRequestCard" key={request.id}>
          <p>Name: {request.name || "N/A"}</p>
          <p>Format: {request.format || "N/A"}</p>
          <p>Day(s): {request.days || "N/A"}</p>
          <p>Experience:  {request.experience || "N/A"}</p>
          <p>Email: {request.email || "N/A"}</p>
          <p>Discord: {request.discord || "N/A"}</p> 
        </li>
      ))}
      {requests.length === 0 && <p>No requests found</p>}
    </ul>
  </div>
)
//Thinking it might be an idea to add radio button for the admin to note if the have contacted the person and if it has been resolved
//also timestamps for when the request was made
}