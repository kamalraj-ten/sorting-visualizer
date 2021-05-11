import React from "react";

const Button = (props) => {
  return (
    <button
      onClick={props.onClickHandler}
      className={props.class}
      disabled={props.sorting}
    >
      {props.text}
    </button>
  );
};

export default Button;
