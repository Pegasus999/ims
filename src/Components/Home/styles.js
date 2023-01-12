import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background);
  flex-direction: column;
`;

export const Container = styled.div`
  width: 70%;
  max-width: 1028px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
`;

export const IconContainer = styled.div`
  width: 300px;
  height: 400px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  cursor: pointer;
  transition: transform 0.2s ease;

  & > :nth-child(1) {
    font-size: 64px;
  }

  &:hover {
    transform: scale(110%);
  }

  &:hover > * {
    transform: scale(125%);
  }

  & > * {
    transition: all 0.4s ease;
  }

  &:nth-of-type(1):hover {
    color: var(--green);
  }
  &:nth-of-type(2):hover {
    color: var(--orange);
  }
`;
