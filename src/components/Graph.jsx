import React from "react";
import Bar from "./Bar";
import Text from "./Text";

const Graph = (props) => {
  return (
    // div is 400px of height
    <div className="graph">
      <center>
        {props.explainer && <Text class="explainer" text={props.explainer} />}
      </center>
      <div className="bottom">
        <div className="graph-container">
          {props.entries.map((element, ind) => {
            let color = "black";
            const width = Math.floor(100 / props.horizontalUnits) + "%";
            if (props.i === ind || props.j === ind) color = "blueviolet";
            if (props.swapI === ind || props.swapJ === ind) color = "red";
            return (
              <Bar
                key={ind}
                height={(element / props.verticalUnits) * 350 + "px"}
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
    </div>
  );
};
export default Graph;
