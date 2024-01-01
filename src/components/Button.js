import React from "react";
import Tap from "../assets/tap.wav";

function Button({ name, time, className, oncClickMethod, disabled }) {
  const clickMethod = () => {
    oncClickMethod(time);
    new Audio(Tap).play();
  };

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={() => clickMethod()}
    >
      {name}
    </button>
  );
}

export default Button;
