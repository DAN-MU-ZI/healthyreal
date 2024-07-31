import * as React from "react";
import "./styles.css";
import Text from "../../atoms/Text";

interface Props {
  title: string;
  contents: React.ReactNode;
  onClick?: () => void;
  more?: string;
}

export default function AlarmLayout(props: Props) {
  const {title, more, contents, onClick} = props;
  return (
    <div className="alarmLayout">
      <div className="header">
        <Text color="black" fontSize="16px" fontWeight="700">
          {title}
        </Text>
        <div className="moreBtn" onClick={onClick}>
          {more}
        </div>
      </div>
      <section className="contents">{contents}</section>
    </div>
  );
}
