import { createContext, useState, useContext, useMemo } from "react";
import { io } from "socket.io-client";
import PropTypes from "prop-types";

const socket = io(import.meta.env.VITE_BACKEND_URL);
const SocketContext = createContext();

function SocketContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [opponent, setOpponent] = useState(null);
  const [userSelection, setUserSelection] = useState(null);
  const [opponentSelection, setOpponentSelection] = useState(null);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const room = "Room1";

  const contextValue = useMemo(() => {
    return {
      socket,
      username,
      setUsername,
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
    };
  }, [
    socket,
    username,
    setUsername,
    opponent,
    setOpponent,
    room,
    userSelection,
    setUserSelection,
    opponentSelection,
    setOpponentSelection,
    score1,
    setScore1,
    score2,
    setScore2,
  ]);

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}
function useSocketContext() {
  const context = useContext(SocketContext);
  return context;
}
export { SocketContextProvider, useSocketContext };

SocketContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
