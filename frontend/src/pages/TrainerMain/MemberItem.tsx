import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  background: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const MemberItem: React.FC<{ member: any }> = ({ member }) => {
  return (
    <Item>
        <div>{member.name} - {member.gender == "MALE" ? "남" : "여"} - {member.programName}</div>
        <div>{member.totalCnt} / {member.remainingCnt}</div>
    </Item>
  );
};

export default MemberItem;
