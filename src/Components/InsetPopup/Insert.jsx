import { useState } from "react";
import { Label } from "../AddPopup/styles";
import { Flex } from "../Shared/Flex";
import {
  Card,
  Container,
  Grid,
  GridItem,
  Input,
  InputQ,
  Wrapper,
} from "./styles";
import { Button } from "../Shared/Button";

export default function InstertPopup({ open, Submit, items, add }) {
  const [value, setValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const arr = items.filter((x) => x.barcode.includes("No BarCode"));
  function Save() {
    if (value !== 0) Submit("Manual", value, quantity);
    open(false);
  }

  function preSaved(obj) {
    Submit(obj.name, obj.price, 1);
    open(false);
  }

  function addPreSaved() {
    open(false);
    add();
  }
  return (
    <Wrapper>
      <Container>
        <Flex height="80%" width="100%">
          <Flex
            jc="center"
            ai="center"
            gap="20px"
            direction="v"
            style={{ flex: "1", borderRight: "1px solid" }}
          >
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
          <Flex
            style={{
              flex: "1",
              overflowY: "auto",
              paddingTop: "40px",
            }}
            height="400px"
            width="100%"
            jc="center"
            ai="center"
          >
            <Grid columns={arr.length + 1}>
              <GridItem>
                <Card
                  onClick={() => {
                    addPreSaved();
                  }}
                >
                  +
                </Card>
              </GridItem>
              {Array.isArray(arr)
                ? arr.map((x, index) => (
                    <GridItem key={index}>
                      <Card onClick={() => preSaved(x)}>{x.name}</Card>
                    </GridItem>
                  ))
                : ""}
            </Grid>
          </Flex>
        </Flex>
        <Flex height="20%" width="100%">
          <Flex jc="center" ai="center" height="100%" width="50%">
            <Button
              bg="var(--red)"
              hover="red"
              w="200px"
              onClick={() => open(false)}
            >
              Cancel
            </Button>
          </Flex>
          <Flex jc="center" ai="center" height="100%" width="50%">
            <Button bg="var(--green)" w="200px" onClick={() => Save()}>
              OK
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Wrapper>
  );
}
