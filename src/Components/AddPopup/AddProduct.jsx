import React from "react";
import { Container, Input, Wrapper } from "./styles";

function AddProduct({ open }) {
  return (
    <>
      <Wrapper>
        <Container>
          <Input></Input>
          <button onClick={() => open(false)}>X</button>
        </Container>
      </Wrapper>
    </>
  );
}

export default AddProduct;
