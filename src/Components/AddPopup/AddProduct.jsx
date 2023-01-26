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
  const [name, setName] = useState("");
  const [wholesale, setWholesale] = useState(0);
  const [price, setPrice] = useState(0);
  const [focus, setFocus] = useState(false);
  const [barCode, setBarCode] = useState("No BarCode");

  useScanDetection({
    onComplete: (code) => ScanHandler(code),
  });

  function ScanHandler(code) {
    if (focus) {
      setBarCode(code);
    }
  }

  function save() {
    const product = {
      name: name,
      price: price,
      wholesale: wholesale,
      barcode: barCode,
    };
    open(false);
    window.SaveData(product);
  }
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
                onFocus={() => {
                  setFocus(true);
                }}
                onBlur={() => setFocus(false)}
                onChange={(e) => setBarCode(e.target.value)}
                readOnly
              ></Input>
            </Flex>
          </Flex>
          <Flex height="10%" width="100%" jc="flex-end" ai="center" gap="10px">
            <LeaveButton onClick={() => open(false)}>Cancel</LeaveButton>
            <SaveButton onClick={() => save()}>Save</SaveButton>
          </Flex>
        </Container>
      </Wrapper>
    </>
  );
}

export default AddProduct;
