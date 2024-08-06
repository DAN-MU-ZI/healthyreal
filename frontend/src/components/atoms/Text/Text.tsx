import * as React from "react";
import "./styles.css";

interface Props {
  fontWeight: string;
  fontSize?: string;
  color?: string;
  children: React.ReactNode;
  className?: string;
}

function Text(props: Props) {
  const {children, color, fontSize, fontWeight, className} = props;

  return (
    <div className={`text ${className}`} style={{color, fontSize, fontWeight}}>
      {children}
    </div>
  );
}

export default Text;
