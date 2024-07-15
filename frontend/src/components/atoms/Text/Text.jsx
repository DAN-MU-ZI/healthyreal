import * as React from "react";
import "./styles.css";

function Text(props) {
  const {children, color, fontSize, fontWeight} = props;

  return (
    <div className="text" style={{color, fontSize, fontWeight}}>
      {children}
    </div>
  );
}

export default Text;
