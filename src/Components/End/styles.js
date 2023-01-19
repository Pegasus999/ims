import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

export const DateContainer = styled.div`
  font-size: 40px;
  font-weight: bold;
  padding: 8px;
`;

export const ItemsContainer = styled.div`
  width: 100%;
  max-height: 50%;
  overflow-y: auto;
  border-bottom: 1px solid;
`;

export const Item = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
`;

export const ColumnBar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
`;

export const Total = styled.div`
  font-size: 40px;
  padding: 8px;
  font-weight: bold;
`;
