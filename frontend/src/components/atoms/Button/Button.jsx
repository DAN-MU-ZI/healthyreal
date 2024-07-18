import * as React from "react";
import classNames from "classnames";
import "./styles.css";

function Button(props) {
  const {children, backgroundColor, width, onClick, color} = props;

  return (
    <button
      className={classNames("button", `background-color-${backgroundColor}`)}
      style={{backgroundColor, width, color}}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
