import { useState, useEffect } from 'react';

export default function GameInfo({ game, editable }) {
  const [currentgamePlayers, setCurrentGamePlayers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedGame, setEditedGame] = useState({ ...game });
  const [newPlayer, setNewPlayer] = useState("");

  useEffect(() => {
  const fetchPlayers = async () => {
    try {
      setCurrentGamePlayers([]); // Reset before fetching
      const response = await fetch(`/api/gamePlayers?game_id=${game.id}`);
      const data = await response.json();
      console.log("Updated State:", data.currentGamePlayers); // Debug state update
      setCurrentGamePlayers([...data.currentGamePlayers]); // Ensure array format
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  fetchPlayers();
}, [game.id]);

  const handleEditButtonClick = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedGame((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddPlayer = () => {
    if (newPlayer.trim() && !gamePlayers.includes(newPlayer)) {
      setCurrentgamePlayers([...currentgamePlayers, newPlayer.trim()]);
      setNewPlayer("");
    }
  };

  const handleRemovePlayer = (player) => {
    setCurrentgamePlayers(currentgamePlayers.filter((p) => p !== player));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/updateGame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editedGame, currentgamePlayers }),
      });
      const data = await response.json();
      console.log('Game updated:', data);
      setModalOpen(false);
    } catch (error) {
      console.error('Error updating game:', error);
    }
  };

  return (
    <div className="gameCard">
      {editable && <button className='btn-edit' onClick={handleEditButtonClick}>Edit</button>}
      <li key={game.id}>
        <h4>{game.sessionName}</h4>
        <p>DM: {game.DM}</p>
        <p>Format: {game.format}</p>
        <p>Day(s): {game.days}</p>
        <p>Openings: {game.maxPlayers - currentgamePlayers.length}</p>
        <p>Players:</p>
        <ul>
          {currentgamePlayers.map((player, index) => (
            <li key={index}>- {player.playerName}</li>
          ))}
        </ul>
      </li>

      {isModalOpen && (
        <div className='modal-overlay bg-opacity-50 fixed inset-0 z-40 bg-black flex items-center justify-center'>
          <div className="modal game-modal">
            <div className="modal-content">
              <h2>Edit Game</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <label>Session Name: <input type="text" name="sessionName" value={editedGame.sessionName} onChange={handleChange} /></label>
                <label>Format: <input type="text" name="format" value={editedGame.format} onChange={handleChange} /></label>
                <label>Day(s): <input type="text" name="days" value={editedGame.days} onChange={handleChange} /></label>
                <label>Max Players: <input type="number" name="maxPlayers" value={editedGame.maxPlayers} onChange={handleChange} /></label>
                <label>DM: <input type="text" name="DM" value={editedGame.DM} onChange={handleChange} /></label>

                <h3>Players:</h3>
                <ul className="player-list">
                  {currentgamePlayers.map((player, index) => (
                    <li key={index}>
                      {player.playerName} <button type="button" onClick={() => handleRemovePlayer(player)}>Remove</button>
                    </li>
                  ))}
                </ul>
                <input type="text" className="add-player-input" value={newPlayer} onChange={(e) => setNewPlayer(e.target.value)} placeholder="Add Player" />
                <button type="button" onClick={handleAddPlayer}>Add</button>

                <div className="modal-actions">
                  <button type="button" onClick={handleSubmit}>Save Changes</button>
                  <button type="button" onClick={handleCloseModal}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
