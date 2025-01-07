import {currentRunningGames} from '../SampleData.json';
import GameInfo from './gameinfo';

export default function CurrentGames() {





    return (
      <div>
        <ul>
          {currentRunningGames.map((game) => (
            <GameInfo key={game.id} game={game} />
          ))}
        </ul>
      </div>
    );
  }