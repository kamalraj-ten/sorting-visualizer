import React from "react";

// a textInput component to get the input
// props = { inputName, entries, onChangeHandler }
const TextInput = (props) => {
  return (
    <div>
      <label htmlFor={props.inputName}>{props.inputName}</label>
      <span className="ml-10">{props.before}</span>
      <input
        className="ml-10 text-input"
        name={props.inputName}
        type="text"
        value={props.input}
        onChange={(e) => {
          props.onChangeHandler(e.target.value.trim());
        }}
      />
      <span className="ml-10">{props.after}</span>
      <div className="validator ml-20">{props.validity}</div>
    </div>
  );
};

export default TextInput;
