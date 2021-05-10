import React from "react";

const Graph = (props) => {
  return (
    <div>
      Graph :
      {props.entries.map((n) => (
        <div key={n}>{n}</div>
      ))}
    </div>
  );
};
export default Graph;
