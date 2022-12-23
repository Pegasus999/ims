import React, { useState } from "react";
import { Flex } from "../Shared/Flex";
import {
  Container,
  Input,
  Label,
  LeaveButton,
  SaveButton,
  Wrapper,
} from "./styles";
import useScanDetection from "use-scan-detection";

function AddProduct({ open }) {
  const [barCode, setBarCode] = useState("No BarCode");
  const [name, setName] = useState("");
  const [wholesale, setWholesale] = useState(0);
  const [price, setPrice] = useState(0);
  useScanDetection({
    onComplete: setBarCode,
  });
  return (
    <>
      <Wrapper>
        <Container>
          <Flex width="100%" height="90%" direction="v">
            <Flex
              gap="5px"
              width="100%"
              direction="v"
              jc="center"
              ai="center"
              height="30%"
            >
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Input>
            </Flex>
            <Flex width="100%" height="30%">
              <Flex
                gap="5px"
                width="100%"
                direction="v"
                jc="center"
                ai="center"
              >
                <Label>Wholesale Price</Label>
                <Input
                  type="number"
                  min="0"
                  value={wholesale}
                  onChange={(e) => setWholesale(e.target.value)}
                ></Input>
              </Flex>
              <Flex
                gap="5px"
                width="100%"
                direction="v"
                jc="center"
                ai="center"
              >
                <Label>Selling Price</Label>
                <Input
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Input>
              </Flex>
            </Flex>
            <Flex
              gap="5px"
              width="100%"
              direction="v"
              jc="center"
              ai="center"
              height="30%"
            >
              <Label>BarCode</Label>
              <Input
                value={barCode}
                onChange={(e) => setBarCode(e.target.value)}
              ></Input>
            </Flex>
          </Flex>
          <Flex height="10%" width="100%" jc="flex-end" ai="center" gap="10px">
            <LeaveButton onClick={() => open(false)}>Cancel</LeaveButton>
            <SaveButton>Save</SaveButton>
          </Flex>
        </Container>
      </Wrapper>
    </>
  );
}

export default AddProduct;
