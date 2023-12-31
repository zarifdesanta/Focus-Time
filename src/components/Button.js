import React from "react";

function Button({ name, time, className, oncClickMethod, disabled }) {
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={() => oncClickMethod(time)}
    >
      {name}
    </button>
  );
}

export default Button;
