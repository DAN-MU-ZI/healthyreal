import "./styles.css";
import Text from "../Text";

interface Props {
  name: string;
  address: string;
  postalCode?: string;
  onClick?: () => void;
}

export default function PlaceCard(props: Props) {
  const {name, address, postalCode, onClick} = props;

  return (
    <div className="gymItem" onClick={onClick}>
      <div className="gymTitle">
        <Text color="var(--main-blue)" fontSize="16px" fontWeight="500">
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
      <div>
        <div className="gymPostalCode">
          <p className="label">우편번호</p>
          <Text color="var(--sub-blue)" fontSize="12px" fontWeight="400">
            {postalCode}
          </Text>
        </div>
      </div>
    </div>
  );
}
