import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: #6200ee;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px) scale(1.05);
    background: #6200ee;
  }
`;

const NavigationButton: React.FC<{ label: string }> = ({ label }) => {
  return <Button>{label}</Button>;
};

export default NavigationButton;
