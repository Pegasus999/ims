import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  top: 0;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: rgba(1, 1, 1, 0.7);
`;
export const Container = styled.div`
  width: 800px;
  height: 500px;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
`;

export const Input = styled.input`
  width: 200px;
  height: 40px;
  outline: none;
  border-radius: 8px;
  text-align: center;
  font-size: 20px;
  border: solid 1px var(--border);
`;
export const LeaveButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  width: fit-content;
  cursor: pointer;
  font-weight: bold;
  color: white;
  outline: none;
  background-color: var(--red);
`;
export const Label = styled.label`
  font-size: medium;
  font-weight: bold;
`;
export const SaveButton = styled.button`
  padding: 10px;

  border-radius: 5px;
  background-color: var(--green);
  outline: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  width: fit-content;
`;
