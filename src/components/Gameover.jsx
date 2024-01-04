export default function GameOver({winner,handleRestart}){

    return(
        <div id="game-over">
<h2>
    Game-over!
</h2>
{winner ? <p>{winner} won!</p>: <p>Its a draw</p>}
<p>
    <button onClick={handleRestart}>
        Rematch!
    </button>
</p>
        </div>
    )



}