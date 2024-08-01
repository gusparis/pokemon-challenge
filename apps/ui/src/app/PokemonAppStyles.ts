import styled from 'styled-components';

export const AppContainer = styled.div`
  padding: 20px;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 20px;

  input {
    flex: 3;
    padding: 10px;
    font-size: 16px;
  }
`;

export const CardGrid = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;
