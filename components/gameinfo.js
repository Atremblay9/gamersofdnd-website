

//I would like to make the Max player become "current openings" and have it be Max Player - a count of the current players in the game.

export default function GameInfo({game}) {
    return (
        <div className="gameCard">

            <li key={game.id}>
                <h4>{game.sessionName}</h4>
                <p>Format: {game.format}</p>
                <p>Day(s): {game.days}</p>
                <p>Max Players: {game.maxPlayers}</p> 
            </li>
        </div>
    );

}