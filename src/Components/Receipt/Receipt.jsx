import { useEffect } from "react";
import { useState } from "react";
import { Flex } from "../Shared/Flex";
import {
  Date,
  StoreName,
  StoreNameContainer,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  Wrapper,
} from "./styles";

export const Receipt = (props) => {
  const storeName = "StoreName";
  const [total, setTotal] = useState(0);
  const list = props.products;

  useEffect(() => {
    let amount = 0;
    for (let i = 0; i < list.length; i++)
      amount += list[i].quantity * parseInt(list[i].price);
    setTotal(amount);
  });
  return (
    <Wrapper>
      <StoreNameContainer>
        <StoreName>{storeName}</StoreName>
      </StoreNameContainer>
      <Date>1/11/2023</Date>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader name="true">Name</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Price</TableHeader>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(list)
              ? list.map((el) => {
                  return (
                    <tr key={el.id}>
                      <TableCell name="true">{el.name}</TableCell>
                      <TableCell>{el.quantity}</TableCell>
                      <TableCell>{el.price}</TableCell>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </TableContainer>
      <Flex
        jc="space-between"
        ai="center"
        width="100%"
        style={{ padding: "8px", borderTop: "2px dotted" }}
      >
        <h2>Total</h2>
        <h2>{total}</h2>
      </Flex>
    </Wrapper>
  );
};
