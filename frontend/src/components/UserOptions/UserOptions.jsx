import PropTypes from "prop-types";
import { useSocketContext } from "../../contexts/SocketContext";

import "./userOptions.scss";

function UserOptions({ handleClick }) {
  const { opponent, userSelection } = useSocketContext();
  const options = ["Rock", "Paper", "Scissors"];

  return (
    <section className="userOptions">
      {options.map((e, index) => (
        <button
          key={options[index]}
          id={options[index]}
          type="button"
          className={
            userSelection !== null || opponent === null
              ? "userOptions__button disabled"
              : "userOptions__button"
          }
          disabled={userSelection !== null || opponent === null}
          onClick={handleClick}
          aria-label={options[index]}
        />
      ))}
    </section>
  );
}

UserOptions.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default UserOptions;
