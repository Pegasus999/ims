import styled from "styled-components";

export const Flex = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${({ direction }) => (direction === "v" ? "column" : "row")};
  align-items: ${({ ai }) => (ai ? ai : "center")};
  justify-content: ${({ jc }) => (jc ? jc : "center")};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  gap: ${({ gap }) => gap};
  background-color: ${({ bg }) => bg};
  flex: ${({ flex }) => flex};
`;
