import styles from "./Pages/Solo/Game.module.scss";

const Square = ({ value, onClick }) => {
  return (
    <button className={styles.square} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
