/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import { useSocketContext } from "../../contexts/SocketContext";
import Score from "../../components/Score/Score";
import UserOptions from "../../components/UserOptions/UserOptions";
import "./rockPaperScissors.scss";

function RockPaperScissors() {
  const {
    socket,
    username,
    opponent,
    setOpponent,
    userSelection,
    setUserSelection,
    opponentSelection,
    setOpponentSelection,
    score1,
    setScore1,
    score2,
    setScore2,
    room,
  } = useSocketContext();

  const [result, setResult] = useState(null);

  const sendPlayerChoice = async () => {
    const playerChoice = {
      pseudo: username,
      choice: userSelection,
      gameRoom: room,
    };

    await socket.emit("player_choice", playerChoice);
  };

  useEffect(() => {
    socket.on("receive_choice", (data) => {
      if (data.pseudo !== username) {
        setOpponentSelection(data.choice);
      }
    });
  }, [socket]);

  const handleClick = (event) => {
    setUserSelection(event.target.id);
  };

  const reset = () => {
    if (score1 === 3 || score2 === 3) {
      setScore1(0);
      setScore2(0);
    }
    setUserSelection(null);
    setOpponentSelection(null);
    setResult(null);
  };

  useEffect(() => {
    if (userSelection !== null) {
      sendPlayerChoice();
    }
  }, [userSelection]);

  useEffect(() => {
    socket.on("room_players", (data) => {
      if (data.length > 1) {
        const opponentPseudo = data.filter((e) => e !== username);
        setOpponent(opponentPseudo);
      }
    });
  }, [socket]);

  const calculateWinner = () => {
    if (userSelection === opponentSelection) {
      setResult("Draw");
    } else if (
      (userSelection === "Rock" && opponentSelection === "Scissors") ||
      (userSelection === "Scissors" && opponentSelection === "Paper") ||
      (userSelection === "Paper" && opponentSelection === "Rock")
    ) {
      score1 + 1 === 3
        ? setResult(`${username} wins the game`)
        : setResult(`${username} wins the round`);
      setTimeout(() => {
        setScore1(score1 + 1);
      }, 1000);
      clearTimeout();
    } else {
      score2 + 1 === 3
        ? setResult(`${opponent} wins the game`)
        : setResult(`${opponent} wins the round`);
      setTimeout(() => {
        setScore2(score2 + 1);
      }, 1000);
      clearTimeout();
    }
    setTimeout(() => {
      reset();
    }, 3000);
    clearTimeout();
  };

  useEffect(() => {
    if (opponentSelection !== null && userSelection !== null) {
      calculateWinner();
    }
  }, [userSelection, opponentSelection]);

  return (
    <main className="container">
      <Score />
      <UserOptions handleClick={handleClick} />
      {userSelection && opponentSelection && (
        <p className="userChoice">{`${userSelection} VS ${opponentSelection}`}</p>
      )}
      {result && <p className="result">{result}</p>}
    </main>
  );
}

export default RockPaperScissors;
