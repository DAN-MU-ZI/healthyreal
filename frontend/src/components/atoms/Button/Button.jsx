import * as React from "react";
import styled from "styled-components";
import "./styles.css";

function Button(props) {
  const {children, backgroundColor, onClick} = props;

  return (
    <button className="button" style={{backgroundColor}} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
