import { useState } from "react";

export default function Player({ name, symbol, isActive,handlePlayerNameChange }) {
  const initialName = name;
  const [playerName, setPlayerName] = useState(initialName);
  const [editing, setEditing] = useState(false);
  const handleSetEditing = () => {
    setEditing((editing) => !editing);
    if(editing){
      handlePlayerNameChange(symbol,playerName)

    }
  };

  const handleChange = (e) => {
    setPlayerName(e.target.value);
  };
  let playerdet;
  if (editing) {
    playerdet = (
      <input type="text" onChange={handleChange} value={playerName} />
    );
  } else {
    playerdet = <span className="player-name">{playerName}</span>;
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerdet}

        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleSetEditing}>{editing ? "Save" : "Edit"} </button>
    </li>
  );
}
