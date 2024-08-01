import styled from 'styled-components';

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DetailImage = styled.img`
  max-width: 200px;
  height: auto;
  border-radius: 8px;
`;

export const DetailName = styled.h3`
  margin-top: 12px;
  font-size: 24px;
  color: #333;
`;

export const DetailInfo = styled.p`
  margin: 8px 0;
  color: #555;
`;

export const BattleSelector = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BattleLabel = styled.label`
  margin-bottom: 8px;
  color: #555;
`;

export const BattleSelect = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
`;

export const BattleButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const BattleResult = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  width: 100%;
  max-width: 300px;
  text-align: center;
`;
