import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import useScanDetection from "use-scan-detection";
import AddToList from "../AddPopup/AddToList";
import InstertPopup from "../InsetPopup/Insert";
import { Quantity } from "../InsetPopup/styles";

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
  const [popOpen, setPopOpen] = useState(false);
  const [addPopUp, setAddPopUp] = useState(false);
  const [code, setCode] = useState("");
  let componentRef = useRef();
  // YOU HAVE TO ADD THE FUNCTIONALITY WHERE F10 passes the order and add it to the list of items sold today
  // and u have to make F11 for example passes the order and print the items and add the order to the list of sold items today
  // ADD THE DATES TO PRODUCTS and MAKE A SECTION WHERE ALMOST EXPIRED ITEMS SHOW
  function SubmitHandler(value, quantity) {
    const object = {
      name: "Manual",
      wholesale: "",
      price: value,
      codebar: "",
      quantity,
    };
    setList((prev) => [...prev, object]);
  }

  const modifyQuantity = (bool, index) => {
    const newItems = [...list];
    const lastItem = newItems[index];
    if (bool) lastItem.quantity++;
    else lastItem.quantity--;
    setList(newItems);
  };

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

    difference.map((el) => {
      if (el.name !== "Manual") window.SaveData(el);
    });
    list.map((item) => {
      if (!item.availability) window.SaveEdit({ ...item, availability: true });
    });
    setList([]);
  }

  function ScanHandler(code) {
    setCode(code);

    if (list.find((item) => item.barcode === code)) {
      setList((prevList) =>
        prevList.map((obj) => {
          if (obj.barcode === code) {
            return { ...obj, quantity: obj.quantity + 1 };
          }
          return obj;
        })
      );
    } else {
      products.map((el) => {
        if (el.barcode === code) {
          setList((prev) => [...prev, { ...el, quantity: 1 }]);
        }
      });
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
      } else if (event.key === "-" && list[list.length - 1].quantity !== 1) {
        modifyQuantity(false, index);
      } else if (event.key === "-" && list[list.length - 1].quantity === 1) {
        Undo();
      }
    } else {
      console.log("empty");
    }
  }

  function PopUpHandler(bool) {
    setPopOpen(bool);
    setAddPopUp(bool);
  }

  useEffect(() => {
    let amount = 0;
    for (let i = 0; i < list.length; i++)
      amount += parseFloat(list[i].price) * list[i].quantity;
    setTotal(amount);
  }, [list]);

  useScanDetection({
    onComplete: (code) => ScanHandler(code),
  });

  function AddHandler(object) {
    setList((prev) => [...prev, object]);
  }

  function Undo() {
    setList((prev) => {
      const items = [...prev];
      items.pop();
      return items;
    });
  }

  return (
    <Wrapper>
      <Header>
        <Back onClick={() => navigate("/")}>Home</Back>
      </Header>
      <Container>
        <TotalDisplay>{total}</TotalDisplay>
        <ButtonsContainer>
          <Button color="var(--green)" onClick={() => PopUpHandler(true)}>
            INSERT
          </Button>
          <ReactToPrint
            trigger={() => <Button color="var(--blue)">PRINT</Button>}
            content={() => componentRef}
          />
          <Button color="var(--yellow)" onClick={() => Undo()}>
            UNDO
          </Button>
          <Button color="var(--red)" onClick={() => Rest()}>
            RESET
          </Button>
        </ButtonsContainer>
        <ItemsContainer ref={(el) => (componentRef = el)}>
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
          <ListContainer>
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
      {addPopUp && (
        <AddToList open={PopUpHandler} add={AddHandler} barCode={code} />
      )}
      {popOpen && <InstertPopup open={PopUpHandler} Submit={SubmitHandler} />}
    </Wrapper>
  );
}
