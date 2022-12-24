import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: none;
  display: flex;
  background-color: var(--background);
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Container = styled.div`
  width: 60%;
  height: 80%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export const TotalDisplay = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  font-size: 100px;
  background-color: var(--border-gray);
  align-items: center;
  border-bottom: 1px solid var(--border);
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border);
  justify-content: space-around;
`;

export const ItemsContainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
`;

export const ColumnBar = styled.div`
  height: 20%;
  border-bottom: 1px solid var(--border);
  width: 100%;
  display: flex;
  background-color: var(--border-gray);
`;

export const Button = styled.button`
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: ${({ color }) => (color ? color : "")};
  outline: none;
  border-radius: 8px;
  cursor: pointer;
`;

export const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

export const Item = styled.div`
  height: 20%;
  border-bottom: 1px solid var(--border);
  width: 100%;
  display: flex;
`;
