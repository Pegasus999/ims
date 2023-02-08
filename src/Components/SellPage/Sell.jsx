import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useScanDetection from "use-scan-detection";
import AddToList from "../AddPopup/AddToList";
import InstertPopup from "../InsetPopup/Insert";
import { Quantity } from "../InsetPopup/styles";
import { Button as B } from "../Shared/Button";
import { Flex } from "../Shared/Flex";
import {
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
  const [popOpen, setPopOpen] = useState(false);
  const [addPopUp, setAddPopUp] = useState({ bool: false, pre: false });
  const [code, setCode] = useState("");
  function EndSessionHandler() {
    window.api.send("end-session");
  }

  function SubmitHandler(object) {
    setList((prev) => [...prev, object]);
  }

  function AddPreSaved() {
    setAddPopUp({ bool: true, pre: true });
  }

  const modifyQuantity = (bool, index) => {
    const newItems = [...list];
    const lastItem = newItems[index];
    if (bool) lastItem.quantity++;
    else {
      if (lastItem.quantity !== 1) {
        lastItem.quantity--;
      } else {
        newItems.splice(index, 1);
      }
    }

    setList(newItems);
  };
  function orderPassed(currentList) {
    window.Pass(currentList);
    Rest();
  }

  const multiplyQuantity = (key, index) => {
    const newItems = [...list];
    const lastItem = newItems[index];
    lastItem.quantity *= parseInt(key);
    setList(newItems);
  };

  const resetQuantity = (index) => {
    const newItems = [...list];
    const lastItem = newItems[index];
    lastItem.quantity = 1;
    setList(newItems);
  };

  console.log(list);

  function Rest() {
    const difference = list.filter(
      (item1) => !products.some((item2) => item1.name === item2.name)
    );

    for (const el of difference) if (el.name !== "Manual") window.SaveData(el);
    for (const item of list) {
      if (!item.availability) window.SaveEdit({ ...item, availability: true });
    }

    setList([]);
  }

  function ScanHandler(code) {
    const items = window.RequestData();
    setCode(code);
    if (items.find((item) => item.barcode.includes(code))) {
      if (list.find((item) => item.barcode.includes(code))) {
        setList((prevList) =>
          prevList.map((obj) => {
            if (obj.barcode.includes(code)) {
              return { ...obj, quantity: obj.quantity + 1 };
            }
            return obj;
          })
        );
      } else {
        for (const el of items) {
          if (el.barcode.includes(code)) {
            setList((prev) => [...prev, { ...el, quantity: 1 }]);
          }
        }
      }
    } else {
      setAddPopUp({ bool: true, pre: false });
    }
  }
  function handleKeyDown(event, index) {
    if (list.length !== 0) {
      if (event.key.match(/\d/)) {
        multiplyQuantity(event.key, index);
      } else if (event.key === "backspace") {
        resetQuantity(index);
      } else if (event.key === "+") {
        modifyQuantity(true, index);
      } else if (event.key === "-") {
        modifyQuantity(false, index);
      }
    } else {
      console.log("empty");
    }
  }

  function PopUpHandler(bool) {
    setPopOpen(bool);
    setAddPopUp({ bool: bool, pre: false });
  }

  useEffect(() => {
    let amount = 0;
    for (let i = 0; i < list.length; i++)
      amount += parseFloat(list[i].price) * list[i].quantity;
    setTotal(amount);
  }, [list]);

  useScanDetection({
    onComplete: (code) => ScanHandler(code),
    stopPropagation: true,
    minLength: 4,
  });

  function AddHandler(object) {
    setList((prev) => [...prev, { ...object }]);
  }

  function Undo() {
    setList((prev) => {
      const items = [...prev];
      items.pop();
      return items;
    });
  }

  function difference() {
    const difference = list.filter((x) => !products.find((y) => x.id === y.id));
    return difference;
  }

  function Home() {
    const arr = difference();
    for (const item of arr) if (item.name !== "Manual") window.SaveData(item);
    navigate("/");
  }

  return (
    <Wrapper>
      <Flex jc="space-between" width="100%" style={{ padding: "8px" }}>
        <B style={{ marginLeft: "20px" }} onClick={() => Home()}>
          Main Menu
        </B>
        <Flex jc="flex-start" ai="flex-end">
          <B
            bg="red"
            hover="red"
            style={{ marginRight: "20px" }}
            onClick={() => {
              EndSessionHandler();
            }}
          >
            End Session
          </B>
        </Flex>
      </Flex>
      <Container>
        <TotalDisplay>{total}</TotalDisplay>
        <ButtonsContainer>
          <B bg="var(--blue)" hover="blue" onClick={() => setPopOpen(true)}>
            INSERT
          </B>
          <B bg="var(--green)" hover="green" onClick={() => orderPassed(list)}>
            Pass
          </B>
          <B bg="#94aa55" hover="#938F6C" onClick={() => Undo()}>
            UNDO
          </B>
          <B bg="var(--red)" hover="red" onClick={() => Rest()}>
            RESET
          </B>
        </ButtonsContainer>
        <ItemsContainer>
          <ColumnBar>
            <Flex
              jcc="center"
              ai="center"
              height="100%"
              style={{
                flex: "1",
                fontSize: "30px",
                borderRight: "1px solid var(--border)",
              }}
            >
              Name
            </Flex>
            <Flex
              jcc="center"
              ai="center"
              height="100%"
              style={{
                fontSize: "30px",
                flex: "1",
                borderRight: "1px solid var(--border)",
              }}
            >
              Price
            </Flex>
            <Flex
              jcc="center"
              ai="center"
              width="33.33%"
              height="100%"
              style={{ fontSize: "30px" }}
            >
              Quantity
            </Flex>
          </ColumnBar>
          <ListContainer id="ree">
            {list.map((el, index) => (
              <Item key={index}>
                <Flex
                  jcc="center"
                  ai="center"
                  height="100%"
                  style={{
                    fontSize: "30px",
                    flex: "1",
                    borderRight: "1px solid var(--border)",
                    textOverflow: "ellipsis",
                  }}
                >
                  {el.name}
                </Flex>
                <Flex
                  jcc="center"
                  ai="center"
                  height="100%"
                  style={{
                    fontSize: "30px",
                    flex: "1",
                    borderRight: "1px solid var(--border)",
                    textOverflow: "ellipsis",
                  }}
                >
                  {el.price}
                </Flex>
                <Flex
                  jcc="center"
                  ai="center"
                  height="100%"
                  style={{
                    fontSize: "30px",
                    flex: "1",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Quantity
                    value={el.quantity}
                    onChange={() => {}}
                    onKeyDown={(e) => {
                      handleKeyDown(e, index);
                    }}
                  ></Quantity>
                </Flex>
              </Item>
            ))}
          </ListContainer>
        </ItemsContainer>
      </Container>
      {addPopUp.bool && (
        <AddToList
          open={PopUpHandler}
          add={AddHandler}
          barCode={addPopUp.pre ? "No BarCode" : code}
        />
      )}
      {popOpen && (
        <InstertPopup
          open={PopUpHandler}
          Submit={SubmitHandler}
          items={products}
          add={AddPreSaved}
        />
      )}
    </Wrapper>
  );
}
