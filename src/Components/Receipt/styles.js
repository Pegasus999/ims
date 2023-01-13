import styled from "styled-components";

export const Wrapper = styled.div`
  width: 400px;

  height: fit-content;
`;
export const StoreNameContainer = styled.div`
  width: 100%;
  height: fit-content;
  text-align: center;
`;
export const StoreName = styled.h1`
  font-size: 40px;
  font-weight: 400;
  color: black;
`;

export const Date = styled.div`
  display: flex;
  text-align: center;
  width: 100%;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-bottom: dotted 2px black;
  border-top: dotted 2px black;
`;

export const TableContainer = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Table = styled.table`
  text-align: center;
  vertical-align: middle;
  width: 100%;
  height: fit-content;
`;

export const TableHeader = styled.th`
  text-align: ${({ name }) => (name ? "left" : "center")};
  height: 20px;
  font-weight: bold;
  width: ${({ name }) => (name ? "50%" : "25%")};
`;

export const TableCell = styled.td`
  text-align: ${({ name }) => (name ? "left" : "center")};
  width: ${({ name }) => (name ? "50%" : "25%")};
`;
