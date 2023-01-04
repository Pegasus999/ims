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
export const Button = styled.button`
  font-weight: bold;
  font-size: 20px;
  width: 288px;
  padding: 10px;
  background-color: ${({ color }) => (color ? color : "")};
  outline: none;
  border-radius: 8px;
  cursor: pointer;
`;
export const Input = styled.input`
  height: 98px;
  width: 350px;
  font-size: 60px;
  border-radius: 18px;
  border: 1px solid var(--border);
  font-weight: bold;
  text-align: center;
`;
export const InputQ = styled(Input)`
  width: 200px;

  font-size: 60px;
`;
