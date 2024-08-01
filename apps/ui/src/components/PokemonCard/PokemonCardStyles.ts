import styled from 'styled-components';

export const CardContainer = styled.a`
  width: 250px;
  height: 400px;
  background: #f9f9f9;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  cursor: pointer;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

export const CardStats = styled.span`
  font-size: 16px;
  color: #ff0000;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 250px;
  display: block;
  border-bottom: 1px solid #e0e0e0;
`;

export const CardInfo = styled.div`
  padding: 10px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
`;

export const CardText = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #555;
`;

export const CardFooter = styled.div`
  padding: 10px;
  height: 40px;
  background: #fff;
  display: flex;
  justify-content: space-between;
`;

export const CardAttribute = styled.div`
  font-size: 12px;
  color: #777;
  width: 33%;
`;
