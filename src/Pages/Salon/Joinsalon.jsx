import { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import styles from "./Joinsalon.module.scss";

const socket = io("http://localhost:4000");

const JoinSalon = () => {
  const [gameId, setGameId] = useState("");
  const navigate = useNavigate();

  const joinGame = () => {
    socket.emit("joinGame", { gameId });

    socket.once("gameJoined", ({ gameId, playerId }) => {
      navigate(`/multiplayergame/${gameId}`, { state: { playerId } });
    });

    socket.once("error", ({ message }) => {
      alert(message);
    });
  };

  return (
    <div className={styles.align}>
      <h1 className={styles.titre}>Le Jeu du Morpion</h1>
      <div>
        <a href="/" className={styles.homepagebtn}>
          Accueil
        </a>
      </div>
      <input
        type="text"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
        placeholder="ID du Salon"
        className={styles.salonid}
      />
      <button onClick={joinGame} className={styles.gamebtn}>
        Rejoindre
      </button>
    </div>
  );
};

export default JoinSalon;
