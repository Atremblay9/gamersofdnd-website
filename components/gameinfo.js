import { useState, useEffect } from 'react';

export default function GameInfo({ game, isDashboard }) {
  const [currentGamePlayers, setCurrentGamePlayers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedGame, setEditedGame] = useState({ ...game });
  const [newPlayer, setNewPlayer] = useState("");

  const [currentGame, setCurrentGame] = useState({ sessionName: game.sessionName, format: game.format, DM: game.DM, days: game.days, maxPlayers: game.maxPlayers, archived: false });

  //need to change how the front end views the changed data, remove the on HandleChange to something else? didn't update the game info on the front end when I changed it, at least the DM didn't

  useEffect(() => {
  const fetchPlayers = async () => {
    try {
      setCurrentGamePlayers([]);//reset before fetching,
      const response = await fetch(`/api/gamePlayers?game_id=${game.id}`);
      const data = await response.json();
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
  if (newPlayer.trim() && !currentGamePlayers.some(player => player.playerName === newPlayer)) {
    const newPlayerObj = { 
      id: currentGamePlayers.length + 1, // Temporary ID
      playerName: newPlayer.trim(),
      game_id: game.id
    };
    try {
      fetch('/api/gamePlayers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlayerObj),
      });
    } catch (error) {
      console.error('Error adding player:', error);
    }

    setCurrentGamePlayers([...currentGamePlayers, newPlayerObj]); 
    setNewPlayer(""); // Reset input field
  }
};


  const handleRemovePlayer = (player) => {
    setCurrentGamePlayers(currentGamePlayers.filter((p) => p !== player));
    try {
      fetch('/api/gamePlayers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: player.id }),
      });
    } catch (error) {
      console.error('Error removing player:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedGame),
      });//need to fix to allow currentGamePlayers to be sent
      const data = await response.json();
      setCurrentGame(data);
      console.log('Game updated:', data);
      setModalOpen(false);
      
    } catch (error) {
      console.error('Error updating game:', error);
    }
  };

  const handleArchive = async () => {
    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: game.id,  archived: true }),
      });
      const data = await response.json();
      console.log('Game archived:', data);
    } catch (error) {
      console.error('Error archiving game:', error);
    }

  }

  if(isDashboard) {
  return (
    <div className="gameCard">
      <button className='btn-edit' onClick={handleEditButtonClick}>Edit</button>
      <li key={game.id}>
        <h4>{currentGame.sessionName}</h4>
        <p>DM: {currentGame.DM}</p>
        <p>Format: {currentGame.format}</p>
        <p>Day(s): {currentGame.days}</p>
        <p>Openings: {currentGame.maxPlayers - currentGamePlayers.length}</p>
        <p>Players:</p>
        <ul>
          {currentGamePlayers.length > 0 &&currentGamePlayers.map((player, index) => (
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
                  {currentGamePlayers.map((player, index) => (
                    <li key={index}>
                      {player.playerName} <button type="button" onClick={() => handleRemovePlayer(player)}>Remove</button>
                    </li>
                  ))}
                </ul>
                <input type="text" className="add-player-input" value={newPlayer} onChange={(e) => setNewPlayer(e.target.value)} placeholder="Add Player" />
                <button type="button" onClick={handleAddPlayer}>Add</button>

                <div className="modal-actions">
                  <button type="button" onClick={handleSubmit}>Save Changes</button>
                  <button className='archive-btn' onClick={handleArchive}>Archive</button>
                  <button type="button" onClick={handleCloseModal}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}  
    </div>);
    }else{
      return (<div className="gameCard">
      <li key={game.id}>
        <h4>{game.sessionName}</h4>
        <p>DM: {game.DM}</p>
        <p>Format: {game.format}</p>
        <p>Day(s): {game.days}</p>
        <p>Openings: {game.maxPlayers - currentGamePlayers.length}</p>
      </li>
    </div>
  )};
  
}
