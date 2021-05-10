import React from "react";

const Selector = (props) => {
  return (
    <select
      className={props.class}
      value={props.value}
      onChange={props.onChangeHandler}
    >
      {props.options.map((element, ind) => {
        return (
          <option key={ind} value={element}>
            {element}
          </option>
        );
      })}
    </select>
  );
};

export default Selector;
