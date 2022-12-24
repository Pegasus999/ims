import { useNavigate } from "react-router-dom";
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
  return (
    <Wrapper>
      <Header>
        <Back onClick={() => navigate("/")}>Home</Back>
      </Header>
      <Container>
        <TotalDisplay>0</TotalDisplay>
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
            {[...Array(8).keys()].map((el, index) => (
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
                  Name
                </Flex>
                <Flex
                  jcc="center"
                  ai="center"
                  width="50%"
                  height="100%"
                  style={{ fontSize: "30px", textOverflow: "ellipsis" }}
                >
                  Price
                </Flex>
              </Item>
            ))}
          </ListContainer>
        </ItemsContainer>
      </Container>
    </Wrapper>
  );
}
