import "./score.scss";
import { useSocketContext } from "../../contexts/SocketContext";

function Score() {
  const { username, opponent, score1, score2 } = useSocketContext();

  return (
    <section className="scoreLine">
      <h2>{username}</h2>
      <p className="scoreLine__score">
        {score1} - {score2}
      </p>
      <h2>{opponent}</h2>
    </section>
  );
}

export default Score;
