import styles from "./Salon.module.scss";
import { Link } from "react-router-dom";

export default function Salon() {
  return (
    <div>
      <div className={styles.align}>
        <h1 className={styles.titre}>Le Jeu du Morpion</h1>
      </div>
      <div className={styles.align}>
        <a href="/" className={styles.gamebtn}>
          Accueil
        </a>
        <Link to="/createsalon" className={styles.gamebtn}>
          Créer un salon
        </Link>
        <Link to="/joinsalon" className={styles.gamebtnjoin}>
          Rejoindre un salon
        </Link>
      </div>
    </div>
  );
}
