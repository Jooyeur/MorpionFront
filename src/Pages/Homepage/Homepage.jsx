import styles from "./Homepage.module.scss";

function App() {
  return (
    <>
      <div className={styles.align}>
        <h1 className={styles.titre}>Le Jeu du Morpion</h1>
      </div>
      <div className={styles.align}>
        <a href="/game" className={styles.gamebtn}>
          Local
        </a>
        <a href="/salon" className={styles.gamebtn}>
          En Ligne
        </a>
      </div>
    </>
  );
}

export default App;
