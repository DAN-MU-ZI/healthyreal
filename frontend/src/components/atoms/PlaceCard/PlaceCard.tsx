import "./styles.css";
import Text from "../Text";

interface Props {
  name: string;
  address: string;
  onClick?: () => void;
  border?: string;
}

export default function PlaceCard(props: Props) {
  const {name, address, onClick, border} = props;

  return (
    <div className="gymItem" onClick={onClick} style={{border}}>
      <div className="gymTitle">
        <Text color="var(--main-blue)" fontSize="16px" fontWeight="400">
          {name}
        </Text>
      </div>
      <div>
        <div className="gymAddress">
          <p className="label">도로명</p>
          <Text color="var(--sub-blue)" fontSize="12px" fontWeight="400">
            {address}
          </Text>
        </div>
      </div>
    </div>
  );
}
