import React from "react";

// a textInput component to get the input
// props = { inputName, entries, onChangeHandler }
const TextInput = (props) => {
  return (
    <div>
      <label htmlFor={props.inputName}>{props.inputName}</label>
      <input
        name={props.inputName}
        type="text"
        value={props.entries}
        onChange={(e) => {
          props.onChangeHandler(e.target.value);
        }}
      />
    </div>
  );
};
