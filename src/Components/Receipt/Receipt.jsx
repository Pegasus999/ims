import { useEffect } from "react";
import { useState } from "react";
import { Flex } from "../Shared/Flex";
import {
  Date,
  StoreName,
  StoreNameContainer,
  Table,
  TableCell,
  TableHeader,
  Wrapper,
} from "./styles";

export default function Receipt(products) {
  const storeName = "Marwa Shopping";
  const [total, setTotal] = useState(0);
  const list = products;

  useEffect(() => {
    let amount = 0;
    for (let i = 0; i < list.length; i++)
      amount += list[i].quantity * list[i].price;
    setTotal(amount);
  });
  return (
    <Wrapper>
      <StoreNameContainer>
        <StoreName>{storeName}</StoreName>
      </StoreNameContainer>
      <Date>1/11/2023</Date>
      <Table>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Price</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(list)
            ? list?.map((el, index) => {
                <tr key={index}>
                  <TableCell name="true">{el.name}</TableCell>
                  <TableCell>{el.quantity}</TableCell>
                  <TableCell>{el.price}</TableCell>
                </tr>;
              })
            : ""}
        </tbody>
      </Table>
      <Flex
        jc="space-between"
        ai="center"
        width="100%"
        style={{ padding: "8px", borderTop: "2px dotted" }}
      >
        <h4>Total</h4>
        <h4>{total}</h4>
      </Flex>
    </Wrapper>
  );
}
