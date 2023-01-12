import styled from "styled-components";

export const Button = styled.button`
  width: ${({ w }) => (w ? w : "100px")};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 25px;
  background-color: ${({ bg }) => (bg ? bg : "var(--green)")};
  color: ${({ text }) => (text ? text : "white")};
  border: ${({ border }) => (border ? "1px solid " + border : "none")};
  outline: none;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  font-weight: bold;
  transition: all 0.2s ease;
  border-radius: 4px;
  &:hover {
    background-color: ${({ hover }) => (hover ? hover : "var(--darker-green)")};
  }
`;
