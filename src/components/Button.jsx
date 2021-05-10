import React from "react";

const Button = (props) => {
  return (
    <button onClick={props.onClickHandler} className={props.class}>
      {props.text}
    </button>
  );
};

export default Button;
