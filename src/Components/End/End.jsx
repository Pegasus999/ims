import { Flex } from "../Shared/Flex";
import {
  ColumnBar,
  DateContainer,
  Item,
  ItemsContainer,
  Total,
  Wrapper,
} from "./styles";

export default function EndSession() {
  const list = window.EndSession();
  var today = new Date();
  var todayFormatted = today
    .toLocaleString("default", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    })
    .replace(/,/g, "-");
  let amount = 0;
  for (let i = 0; i < list.length; i++)
    amount += list[i].quantity * parseInt(list[i].price);

  return (
    <Wrapper>
      <Flex width="100%" height="20%">
        <DateContainer>{todayFormatted}</DateContainer>
      </Flex>
      <ColumnBar>
        <Flex flex="2">Name</Flex>
        <Flex flex="1">Price</Flex>
        <Flex flex="1">Quantity</Flex>
      </ColumnBar>
      <ItemsContainer>
        {Array.isArray(list)
          ? list.map((el) => {
              return (
                <Item key={el.id}>
                  <Flex flex="2">{el.name}</Flex>
                  <Flex flex="1">{el.price}</Flex>
                  <Flex flex="1">{el.quantity}</Flex>
                </Item>
              );
            })
          : null}
      </ItemsContainer>
      <Flex width="100%" height="20%" jc="space-around">
        <h3>Total</h3>
        <Total>{amount}</Total>
      </Flex>
    </Wrapper>
  );
}
