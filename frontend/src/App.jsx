import { useNavigate } from "react-router-dom";
import { useSocketContext } from "./contexts/SocketContext";
import "./App.scss";

function App() {
  const { socket, username, setUsername, room } = useSocketContext();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUsername(event.target.value);
  };
  const joinRoom = () => {
    if (username !== "") {
      socket.emit("join room", { pseudo: username, gameRoom: room });
      navigate("/game");
    }
  };

  return (
    <section className="gameMenu">
      <label htmlFor="username" className="gameMenu__label">
        Username
      </label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={handleChange}
        placeholder="Username"
      />
      <button type="button" onClick={joinRoom} aria-label="Play">
        Play
      </button>
    </section>
  );
}

export default App;
