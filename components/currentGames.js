import { useEffect, useState } from 'react';

import GameInfo from './gameinfo';

export default function CurrentGames({isDashboard}) {
  const [currentRunningGames, setCurrentRunningGames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newGame, setNewGame] = useState({ sessionName: '', format: '', DM: '', days: '', maxPlayers: '', archived: false });
  

  

  // Fetch the data from the API when the component mounts
  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
  try {
    const response = await fetch('/api/games');
    if (!response.ok) {
      throw new Error('Failed to fetch games');
    }
    const data = await response.json();
    setCurrentRunningGames(data.currentRunningGames);
  } catch (error) {
    console.error('Error fetching games:', error);
  }
};

  const handleAddGame = async () => {
    if (!newGame.sessionName || !newGame.format || !newGame.DM || !newGame.days) return;

    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionName: newGame.sessionName,
          format: newGame.format,
          DM: newGame.DM,
          days: newGame.days,
          maxPlayers: newGame.maxPlayers,
          archived: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      setCurrentRunningGames((prevGames) => [...prevGames, data.item]);  // Optimistically update state
    } catch (error) {
      console.error('Error adding item:', error.message);
    } finally {
      setNewGame({ sessionName: '', format: '', DM: '', days: '', maxPlayers: '', archived: false });
      setShowModal(false);
      fetchGames();  // Trigger a re-fetch after adding an item
    }
  };


  return (
    <div>
      {isDashboard && (<div className="currentGames-header">
        <h3>Current Games</h3>
        <button onClick={() => setShowModal(true)}>Add Game</button>
      </div>)}
      
      <ul>
        {currentRunningGames.map((game) => (
          <GameInfo key={game.id} game={game} isDashboard={isDashboard} />
        ))}
      </ul>

      {isDashboard && showModal && (
        <div className="modal game-add-modal">
          <div className="modal-content">
            <h2>Add Game</h2>
            <label>Session Name
              <input type="text" value={newGame.sessionName} onChange={(e) => setNewGame({ ...newGame, sessionName: e.target.value })} />
            </label>
            <label>Format
              <input type="text" value={newGame.format} onChange={(e) => setNewGame({ ...newGame, format: e.target.value })} />
            </label>
            <label>DM
              <input type="text" value={newGame.DM} onChange={(e) => setNewGame({ ...newGame, DM: e.target.value })} />
            </label>
            <label>Days
              <input type="text" value={newGame.days} onChange={(e) => setNewGame({ ...newGame, days: e.target.value })} />
            </label>
            <label>Max Players
              <input type="number" value={newGame.maxPlayers} onChange={(e) => setNewGame({ ...newGame, maxPlayers: e.target.value })} />
            </label>
            <div className="modal-actions">
              <button onClick={handleAddGame}>Add</button>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
