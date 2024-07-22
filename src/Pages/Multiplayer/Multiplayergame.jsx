import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import io from "socket.io-client";
import styles from "./Multiplayergame.module.scss";
import Square from "../../Square";

const socket = io("http://localhost:4000");

const MultiplayerGame = () => {
  const { gameId } = useParams();
  const location = useLocation();
  const playerId = location.state?.playerId;

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  useEffect(() => {
    socket.emit("joinGame", { gameId });

    socket.on("gameUpdate", ({ squares, xIsNext, currentPlayer }) => {
      setSquares(squares);
      setXIsNext(xIsNext);
      setCurrentPlayer(currentPlayer);
      setWinner(calculateWinner(squares));
    });

    socket.on("statusUpdate", (status) => {
      setWinner(status);
    });

    return () => {
      socket.off("gameUpdate");
      socket.off("statusUpdate");
    };
  }, [gameId]);

  const handleClick = (index) => {
    if (winner || squares[index] || currentPlayer !== playerId) {
      return;
    }
    const value = xIsNext ? "X" : "O";
    socket.emit("makeMove", { gameId, index, value });
  };

  const renderSquare = (index) => {
    return <Square value={squares[index]} onClick={() => handleClick(index)} />;
  };

  return (
    <div className={styles.game}>
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
      <div className={styles.status}>
        {winner
          ? `Gagnant: ${winner}`
          : `Prochain Joueur: ${xIsNext ? "X" : "O"}`}
      </div>
      {currentPlayer && (
        <div className={styles.currentPlayer}>
          {currentPlayer === playerId
            ? `C'est votre tour, joueur ${xIsNext ? "X" : "O"}`
            : `En attente de l'autre joueur...`}
        </div>
      )}
    </div>
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

export default MultiplayerGame;
