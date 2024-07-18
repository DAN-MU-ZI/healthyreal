import * as React from "react";
import classNames from "classnames";
import "./styles.css";

interface Props {
  backgroundColor: string;
  width?: string;
  color?: string;
  children: React.ReactNode;
  onClick: () => void;
}
function Button(props: Props) {
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
