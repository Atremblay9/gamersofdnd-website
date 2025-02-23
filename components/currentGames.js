import { useEffect, useState } from 'react';

import GameInfo from './gameinfo';
import GameInfoAdmin from './gameinfoAdmin';

export default function CurrentGames(isDashboard) {
  const [currentRunningGames, setCurrentRunningGames] = useState([]);

  

  

  // Fetch the data from the API when the component mounts
  useEffect(() => {
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

    fetchGames();
  }, []);

  return (
    <div>
      {!isDashboard && (
        <div>
          <h2>Current Running Games</h2>
          <ul>
            {currentRunningGames.map((game) => (
              <GameInfo key={game.id} game={game} />
            ))}
          </ul>
        </div>
      )}
      <div>
        <ul>
          {currentRunningGames.map((game) => (
            <GameInfoAdmin key={game.id} game={game} />
          ))}
        </ul>
      </div>
    </div>
  );
}
