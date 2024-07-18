import * as React from "react";
import "./styles.css";

interface Props {
  fontWeight: string;
  fontSize?: string;
  color?: string;
  children: React.ReactNode;
}

function Text(props: Props) {
  const {children, color, fontSize, fontWeight} = props;

  return (
    <div className="text" style={{color, fontSize, fontWeight}}>
      {children}
    </div>
  );
}

export default Text;
