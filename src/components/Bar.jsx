import React from "react";

const Bar = (props) => {
  const styles = {
    height: props.height,
    width: props.width,
    backgroundColor: props.color,
  };
  return <div style={styles}></div>;
};

export default Bar;
