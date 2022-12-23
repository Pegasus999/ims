import React, { useState } from "react";
import AddProduct from "../AddPopup/AddProduct";
import FilterBar from "./FilterBar";
import {
  AddButton,
  Header,
  Item,
  ItemLabel,
  ItemsList,
  ProductsContainer,
  Wrapper,
} from "./styles";

export default function Inventory() {
  const [selected, setSelected] = useState([]);
  const [popOpen, setPopOpen] = useState(false);

  function HandleCheck(e, key) {
    if (e.target.checked) {
      setSelected((prev) => [...prev, key]);
    } else {
      const newArr = selected.filter((el) => el !== key);
      setSelected(newArr);
    }
  }
  function AddHandler(bool) {
    setPopOpen(bool);
  }
  return (
    <div style={{ position: "relative" }}>
      <Wrapper>
        <Header>
          <h2>Products</h2>
          <AddButton onClick={() => AddHandler(true)}>Add Product</AddButton>
        </Header>
        <ProductsContainer>
          <FilterBar selected={selected} />
          <ItemsList>
            {[...Array(12).keys()].map((el, key) => (
              <Item key={key} style={{ padding: "0 20px" }}>
                <input type="checkbox" onChange={(e) => HandleCheck(e, key)} />
                <div style={{ width: "40px" }}></div>
                <ItemLabel style={{ width: "250px" }}>Name</ItemLabel>
                <ItemLabel>Price</ItemLabel>
                <ItemLabel>WholesalePrice</ItemLabel>
                <ItemLabel>Quantity</ItemLabel>
                <ItemLabel>CodeBar</ItemLabel>
              </Item>
            ))}
          </ItemsList>
        </ProductsContainer>
      </Wrapper>
      {popOpen && <AddProduct open={AddHandler} />}
    </div>
  );
}
