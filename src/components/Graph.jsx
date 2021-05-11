import React from "react";
import Bar from "./Bar";

const Graph = (props) => {
  const style = {
    height: props.verticalUnits,
  };
  return (
    <div>
      <center>
        <div color="black" backgroundColor="grey">
          {props.explainer}
        </div>
      </center>
      <div className="graph-container">
        {props.entries.map((element, ind) => {
          let color = "black";
          const width = Math.floor(100 / props.horizontalUnits) + "%";
          if (props.i === ind || props.j === ind) color = "blueviolet";
          if (props.swapI === ind || props.swapJ === ind) color = "red";
          return (
            <Bar
              key={ind}
              height={element + "px"}
              width={width}
              color={color}
            />
          );
        })}
      </div>

      <hr />
      <div className="graph-container">
        {props.entries.map((element, ind) => {
          let color = "black";
          if (props.i === ind || props.j === ind) color = "blueviolet";
          if (props.swapI === ind || props.swapJ === ind) color = "red";
          return (
            <span key={ind} color={color}>
              {element}
            </span>
          );
        })}
      </div>
    </div>
  );
};
export default Graph;
