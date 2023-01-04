import { useState } from "react";
import { Label } from "../AddPopup/styles";
import { Flex } from "../Shared/Flex";
import { Button, Container, Input, InputQ, Wrapper } from "./styles";

export default function InstertPopup({ open, Submit }) {
  const [value, setValue] = useState(0);
  const [quantity, setQuantity] = useState(1);

  function Save() {
    if (value !== 0) Submit(value, quantity);
    open(false);
  }

  return (
    <Wrapper>
      <Container>
        <Flex height="80%" width="100%">
          <Flex jc="center" ai="center" gap="20px">
            <Flex jc="center" ai="center" direction="v" gap="10px">
              <Label>Price</Label>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
              ></Input>
            </Flex>
            <Flex jc="center" ai="center" direction="v" gap="10px">
              <Label>Quantity</Label>
              <InputQ
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
              ></InputQ>
            </Flex>
          </Flex>
        </Flex>
        <Flex height="20%" width="100%">
          <Flex jc="center" ai="center" height="100%" width="50%">
            <Button color="var(--red)" onClick={() => open(false)}>
              Cancel
            </Button>
          </Flex>
          <Flex jc="center" ai="center" height="100%" width="50%">
            <Button color="var(--green)" onClick={() => Save()}>
              Ok
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Wrapper>
  );
}
