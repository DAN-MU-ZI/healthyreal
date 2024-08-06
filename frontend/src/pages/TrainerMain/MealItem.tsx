import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  background: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const MealItem: React.FC<{ meal: any }> = ({ meal }) => {
  return (
    <Item>
      <div>{meal.date} - {meal.mealType}</div>
      <div>{meal.memberName}</div>
    </Item>
  );
};

export default MealItem;
