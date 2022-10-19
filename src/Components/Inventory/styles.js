import styled from "styled-components";
import { Flex } from "../Shared/Flex";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 80px;
  background-color: var(--background);
`;

export const Header = styled(Flex)`
  max-width: 1440px;
  margin: 0 auto;
  justify-content: space-between;
  padding: 20px 0;
`;

export const ProductsContainer = styled.div`
  max-width: 1440px;
  min-height: calc(100vh - 150px);
  max-height: 586px;
  margin: 0 auto;
  background-color: white;
  border: 1px solid var(--border-gray);
  border-radius: 8px;
`;

/* ------------------------------------------------- */

export const Filters = styled.div`
  width: 100%;
  height: 100px;
  border-bottom: 1px solid var(--border-gray);
`;

//top filters

export const SearchBar = styled.input`
  width: 400px;
  height: 35px;
  padding: 0 35px;
  border-radius: 4px;
  border: 1px solid var(--border-gray);
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 5px;
  left: ${({ align }) => (align === "left" ? "5px" : "")};
  right: ${({ align }) => (align === "right" ? "5px" : "")};
  cursor: pointer;

  & * {
    font-size: 24px;
  }
`;

export const DeleteButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  width: fit-content;
  cursor: pointer;
  font-weight: bold;
  color: white;
  outline: none;
  border: 1px solid var(--border-gray);
  background-color: ${({ disabled }) =>
    disabled === true ? "var(--lighter-red)" : "var(--red)"};
`;

export const EditButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  width: fit-content;
  cursor: pointer;
  font-weight: bold;
  color: white;
  outline: none;
  border: 1px solid var(--border-gray);
  background-color: ${({ disabled }) =>
    disabled === true ? "var(--lighter-blue)" : "var(--blue)"};
`;
//bottom filters - columns

export const ColumnName = styled.p`
  width: 150px;
  font-size: 14px;
  color: var(--border);
  font-weight: bold;
  cursor: pointer;
`;

export const ItemLabel = styled(ColumnName)`
  cursor: default;
  font-weight: 400;
`;
// products -
export const ItemsList = styled.div`
  width: 100%;
  max-height: calc(100vh - 251px);
  overflow-y: scroll;
`;
export const Item = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid var(--border-gray);
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 40px;
`;
export const AddButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  outline: none;
  border: 1px solid var(--border-gray);
  background-color: var(--green);
`;
