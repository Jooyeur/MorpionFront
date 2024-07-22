import { useState, useEffect, useRef } from "react";
import styles from "./Game.module.scss";
import Square from "../../Square";

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [countdown, setCountdown] = useState(3);
  const [gameEnded, setGameEnded] = useState(false);
  const timeoutIdRef = useRef(null);

  const handleClick = (index) => {
    if (calculateWinner(squares) || squares[index] !== null) {
      return;
    }
    const newSquares = [...squares];
    newSquares[index] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index) => {
    return <Square value={squares[index]} onClick={() => handleClick(index)} />;
  };

  useEffect(() => {
    let timeoutId;

    if (calculateWinner(squares) && !gameEnded) {
      timeoutId = setTimeout(() => {
        if (countdown > 0) {
          setCountdown(countdown - 1);
        } else {
          const winner = calculateWinner(squares);
          if (winner) {
            setScore((prevScore) => ({
              ...prevScore,
              [winner]: prevScore[winner] + 1,
            }));
          }
          setGameEnded(true);
        }
      }, 1000);
      timeoutIdRef.current = timeoutId;
    }

    return () => clearTimeout(timeoutIdRef.current);
  }, [squares, countdown, gameEnded]);

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setGameEnded(false);
    setCountdown(3);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Gagnant: ${winner}`;
  } else {
    status = `Prochain Joueur: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <>
      <div className={styles.floor}>
        <h1 className={styles.titre}>Le Jeu du Morpion</h1>
        <div className={styles.alignhome}>
          <a href="/" className={styles.homepagebtn}>
            Accueil
          </a>
        </div>
        <div className={styles.alignscore}>
          <div className={styles.scoreboard}>
            <h2>Score</h2>
            <p>Joueur X : {score.X}</p>
            <p>Joueur O : {score.O}</p>
          </div>
        </div>
        <div className={styles.status}>{status}</div>
        <div className={styles.aligncountdown}>
          {winner && !gameEnded && countdown > 0 && (
            <div className={styles.countdown}>
              Nouvelle manche dans {countdown}...
            </div>
          )}
          {gameEnded && (
            <button className={styles.retrybtn} onClick={restartGame}>
              Rejouer
            </button>
          )}
        </div>
        <div className={styles.board}>
          <div className={styles.boardrow}>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className={styles.boardrow}>
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className={styles.boardrow}>
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      </div>
    </>
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
};

export default Game;
