import * as React from "react";
import "./styles.css";
import styled from "styled-components";

interface Props {
  src?: string;
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

const CardContainer = styled.div<{selected: boolean}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  box-sizing: border-box;
  width: 160px;
  height: 180px;
  border-radius: 25px;
  background-color: ${({selected}) => (selected ? "#fca34d" : "white")};
  color: ${({selected}) => (selected ? "white" : "black")};
  box-shadow: 0 0 5px 2px #f1f1f1;
`;

function Card(props: Props) {
  const {children, src, onClick, selected = false} = props;

  return (
    <CardContainer onClick={onClick} selected={selected}>
      {src == null ? null : (
        <div className="card-icon">
          <img src={src} alt="cardIcon" className="iconImg" />
        </div>
      )}

      <p className="card-text">{children}</p>
    </CardContainer>
  );
}

export default Card;
