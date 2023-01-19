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

  function handleClose() {
    window.close();
  }
  function handleDone() {
    window.Done();
    window.close();
  }
  return (
    <Wrapper>
      <Flex width="100%" height="20%">
        <DateContainer>{todayFormatted}</DateContainer>
      </Flex>
      <ItemsContainer>
        <ColumnBar>
          <Flex flex="2" style={{ border: "1px solid" }}>
            Name
          </Flex>
          <Flex flex="1" style={{ border: "1px solid" }}>
            Price
          </Flex>
          <Flex flex="1" style={{ border: "1px solid" }}>
            Quantity
          </Flex>
        </ColumnBar>
        {Array.isArray(list)
          ? list.map((el) => {
              return (
                <Item key={el.id}>
                  <Flex flex="2" style={{ border: "1px solid" }}>
                    {el.name}
                  </Flex>
                  <Flex flex="1" style={{ border: "1px solid" }}>
                    {el.price}
                  </Flex>
                  <Flex flex="1" style={{ border: "1px solid" }}>
                    {el.quantity}
                  </Flex>
                </Item>
              );
            })
          : null}
      </ItemsContainer>
      <Flex width="100%" jc="space-around">
        <h3>Total</h3>
        <Total>{amount} Da</Total>
      </Flex>
      <Flex
        heigh="100px"
        width="100%"
        jc="center"
        ai="center"
        gap="10px"
        padding="18px "
      >
        {" "}
        <button
          onClick={() => handleClose()}
          style={{
            width: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 25px",
            backgroundColor: "red",
            color: "white",
            outline: "none",
            cursor: "pointer",
            fontWeight: "bold",
            borderRadius: "4px",
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleDone();
          }}
          style={{
            width: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 25px",
            backgroundColor: "green",
            color: "white",
            outline: "none",
            cursor: "pointer",
            fontWeight: "bold",
            borderRadius: "4px",
          }}
        >
          Save
        </button>
      </Flex>
    </Wrapper>
  );
}
