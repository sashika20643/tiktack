import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOver from "./components/Gameover";

function derriveplayer(turns){
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function derrivedGameBoard(gameTurns){
  let gameBoard=[...INITIAL_GAME_BOARD.map(array => [...array])];
  for(const turn of gameTurns) {
    const {square, player}= turn;
    const {row,col}= square;
    gameBoard[row][col] = player;
   }
   return gameBoard;
}

function derrivedWinner(gameBoard,players){
  let winner=null;
 


for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol =  gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol =  gameBoard[combination[2].row][combination[2].column]
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol==thirdSquareSymbol ){
      winner=players[firstSquareSymbol];
    }
}
return winner;
}
const PLAYERS={
  X: 'player 1',
  O: 'player 2'
}
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function App() {
const [players,setPlayers]  =useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer=derriveplayer(gameTurns);

const gameBoard=derrivedGameBoard(gameTurns)
 const winner=derrivedWinner(gameBoard,players)
 const hasDraw = gameTurns.length === 9 && !winner;


  const handleSquare = (rowIndex,colIndex) => {
    setGameTurns((prevTurns) => {
      let currentPlayer = derriveplayer(prevTurns)
 
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };


  const handleRestart=()=>{

setGameTurns([]);
  }

 const handlePlayerNameChange=(symbol,newname)=>{
 setPlayers(
prevplayers=>{
  return {
    ...prevplayers,[symbol]:newname
  };
}

 );
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} handlePlayerNameChange={handlePlayerNameChange} symbol="X" isActive={activePlayer === "X"} />
          <Player name={PLAYERS.O} handlePlayerNameChange={handlePlayerNameChange} symbol="O" isActive={activePlayer === "O"} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} handleRestart={handleRestart}/>}
        <GameBoard
          onselectSquare={handleSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
