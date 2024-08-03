import {useState} from "react";
import "./styles.css";
import Card from "../../atoms/Card";

interface Props {
  onDataChange: (selectedAlarm: boolean) => void;
}

const Receive: React.FC<Props> = ({onDataChange}) => {
  const [agree, setAgree] = useState(false);

  const agreeToReceive = (checked: boolean) => {
    setAgree(checked);
    onDataChange(agree);
  };

  return (
    <div className="agreeSection">
      <Card onClick={() => agreeToReceive(true)} selected={agree === true}>
        예
      </Card>
      <Card onClick={() => agreeToReceive(false)} selected={agree === false}>
        아니요
      </Card>
    </div>
  );
};

export default Receive;
