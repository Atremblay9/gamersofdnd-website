import { useState, useEffect } from 'react';

export default function GameInfo({ game }) {
  const [currentGamePlayers, setCurrentGamePlayers] = useState([]);

  useEffect(() => {
  const fetchPlayers = async () => {
    try {
      setCurrentGamePlayers([]); // Reset before fetching
      const response = await fetch(`/api/gamePlayers?game_id=${game.id}`);
      const data = await response.json();
      setCurrentGamePlayers([...data.currentGamePlayers]); // Ensure array format
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  fetchPlayers();
}, [game.id]);


  return (
    <div className="gameCard">
      <li key={game.id}>
        <h4>{game.sessionName}</h4>
        <p>DM: {game.DM}</p>
        <p>Format: {game.format}</p>
        <p>Day(s): {game.days}</p>
        <p>Openings: {game.maxPlayers - currentGamePlayers.length}</p>
      </li>
    </div>
  );
}
