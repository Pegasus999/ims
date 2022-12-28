import React, { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import AddProduct from "../AddPopup/AddProduct";
import EditProduct from "../EditPopup/EditProduct";
import FilterBar from "./FilterBar";
import {
  AddButton,
  Back,
  Header,
  Item,
  ItemLabel,
  ItemsList,
  ProductsContainer,
  Wrapper,
} from "./styles";

export default function Inventory() {
  const [selected, setSelected] = useState(6);
  const navigate = useNavigate();
  const [popOpen, setPopOpen] = useState(false);
  const [popeditOpen, setPopEditOpen] = useState(false);
  const [item, setItem] = useState();
  const [products, setProducts] = useState(() => window.RequestData());
  const [productList, setProductList] = useState(products);

  function HandleCheck(e, key) {
    if (e.target.checked) {
      setSelected((prev) => [...prev, key]);
    } else {
      const newArr = selected.filter((el) => el !== key);
      setSelected(newArr);
    }
  }
  console.log(products);
  function AddHandler(bool) {
    setPopOpen(bool);
  }
  function EditHandler(el, bool) {
    setItem(el);

    setPopEditOpen(bool);
  }

  return (
    <div style={{ position: "relative" }}>
      <Wrapper>
        <Header>
          <Back onClick={() => navigate("/")}>Home</Back>
          <AddButton onClick={() => AddHandler(true)}>Add Product</AddButton>
        </Header>
        <ProductsContainer>
          <FilterBar
            selected={selected}
            products={products}
            setProductList={setProductList}
          />
          <ItemsList>
            {productList?.map((el, key) => (
              <Item key={key} style={{ padding: "0 20px" }}>
                <input type="checkbox" onChange={(e) => HandleCheck(e, key)} />
                <div style={{ width: "40px" }}></div>

                <ItemLabel
                  style={{ width: "150px" }}
                  onClick={() => EditHandler(el, true)}
                >
                  {el.name}
                </ItemLabel>
                <ItemLabel onClick={() => EditHandler(el, true)}>
                  {el.price}
                </ItemLabel>

                <ItemLabel onClick={() => EditHandler(el, true)}>
                  {el.wholesale}
                </ItemLabel>
                <ItemLabel
                  onClick={() => {
                    EditHandler(el, true);
                  }}
                >
                  {el.barcode}
                </ItemLabel>
              </Item>
            ))}
          </ItemsList>
        </ProductsContainer>
      </Wrapper>
      {popOpen && <AddProduct open={AddHandler} />}
      {popeditOpen && <EditProduct item={item} open={EditHandler} />}
    </div>
  );
}
