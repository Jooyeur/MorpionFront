import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import styles from "./Createsalon.module.scss";

const socket = io("http://localhost:4000");

const CreateSalon = () => {
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("createGame");

    socket.once("gameCreated", ({ gameId }) => {
      navigate(`/multiplayergame/${gameId}`);
    });
  }, [navigate]);

  return (
    <div className={styles.align}>
      <h1 className={styles.titre}>Création de salon...</h1>
      <a href="/" className={styles.gamebtn}>
        Annuler
      </a>
    </div>
  );
};

export default CreateSalon;
