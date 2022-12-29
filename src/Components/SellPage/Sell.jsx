import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useScanDetection from "use-scan-detection";
import { Back, Header } from "../Inventory/styles";
import { Flex } from "../Shared/Flex";
import {
  Button,
  ButtonsContainer,
  ColumnBar,
  Container,
  Item,
  ItemsContainer,
  ListContainer,
  TotalDisplay,
  Wrapper,
} from "./styles";

export default function Sell() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const products = window.RequestData();
  const [total, setTotal] = useState(0);
  function ScanHandler(code) {
    products.map((el) => {
      if (el.barcode == code) setList((prev) => [...prev, el]);
    });
  }

  useEffect(() => {
    list.map((el) => {
      setTotal(total + parseFloat(el["price"]));
    });
  }, [list]);

  useScanDetection({
    onComplete: (code) => ScanHandler(code),
  });

  return (
    <Wrapper>
      <Header>
        <Back onClick={() => navigate("/")}>Home</Back>
      </Header>
      <Container>
        <TotalDisplay>{total}</TotalDisplay>
        <ButtonsContainer>
          <Button color="var(--green)">INSERT</Button>
          <Button color="var(--blue)">PRINT</Button>
          <Button color="var(--yellow)">UNDO</Button>
          <Button color="var(--red)">RESET</Button>
        </ButtonsContainer>
        <ItemsContainer>
          <ColumnBar>
            <Flex
              jcc="center"
              ai="center"
              width="49.65%"
              height="100%"
              style={{
                fontSize: "30px",
                borderRight: "1px solid var(--border)",
              }}
            >
              Name
            </Flex>
            <Flex
              jcc="center"
              ai="center"
              width="50%"
              height="100%"
              style={{ fontSize: "30px" }}
            >
              Price
            </Flex>
          </ColumnBar>
          <ListContainer>
            {list?.map((el, index) => (
              <Item key={index}>
                <Flex
                  jcc="center"
                  ai="center"
                  width="50%"
                  height="100%"
                  style={{
                    fontSize: "30px",
                    borderRight: "1px solid var(--border)",
                    textOverflow: "ellipsis",
                  }}
                >
                  {el.name}
                </Flex>
                <Flex
                  jcc="center"
                  ai="center"
                  width="50%"
                  height="100%"
                  style={{ fontSize: "30px", textOverflow: "ellipsis" }}
                >
                  {el.price}
                </Flex>
              </Item>
            ))}
          </ListContainer>
        </ItemsContainer>
      </Container>
    </Wrapper>
  );
}
