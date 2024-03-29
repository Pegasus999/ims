import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbBoxOff, TbBox } from "react-icons/tb";
import AddProduct from "../AddPopup/AddProduct";
import EditProduct from "../EditPopup/EditProduct";
import FilterBar from "./FilterBar";
import {
  Header,
  Item,
  ItemLabel,
  ItemsList,
  ProductsContainer,
  Wrapper,
} from "./styles";
import { Button as B } from "../Shared/Button";

export default function Inventory() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [popOpen, setPopOpen] = useState(false);
  const [popeditOpen, setPopEditOpen] = useState(false);
  const [item, setItem] = useState();
  const [products, setProducts] = useState(window.RequestData());
  const [productList, setProductList] = useState(products);

  useEffect(() => {
    setTimeout(() => {
      setProducts(window.RequestData());
      setProductList(window.RequestData);
    }, 600);
  }, [popOpen, popeditOpen]);

  function HandleCheck(e, id) {
    if (e.target.checked) {
      selected ? setSelected((prev) => [...prev, id]) : setSelected(id);
    } else {
      const newArr = selected.filter((el) => el !== id);
      setSelected(newArr);
    }
  }

  function AddHandler(bool) {
    setPopOpen(bool);
  }

  function EditHandler(el, bool) {
    setItem(el);

    setPopEditOpen(bool);
  }

  function availabilityHandler(index) {
    const arr = [...products];
    const targetIndex = arr.findIndex((obj) => obj.id === index);
    const target = { ...arr[targetIndex] };
    target.availability = !target.availability;
    arr[targetIndex] = target;
    setProductList(arr);
  }
  console.log(products);

  function homeClick() {
    const difference = productList.filter((obj1) => {
      const match = products.find((obj2) => obj1.id === obj2.id);
      return match && obj1.availability !== match.availability;
    });

    for (let i = 0; i < difference.length; i++) {
      window.SaveEdit(difference[i]);
    }
    navigate("/");
  }

  return (
    <div style={{ position: "relative" }}>
      <Wrapper>
        <Header>
          <B onClick={() => homeClick()}>Main Menu</B>
          <B onClick={() => AddHandler(true)}>Add Product</B>
        </Header>
        <ProductsContainer>
          <FilterBar
            selected={selected}
            products={products}
            list={productList}
            setProductList={setProductList}
          />
          <ItemsList>
            {productList?.map((el, key) => (
              <Item key={key} style={{ padding: "0 20px" }}>
                <input
                  type="checkbox"
                  onChange={(e) => HandleCheck(e, el.id)}
                />
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
                <ItemLabel
                  style={{ minWidth: "60px" }}
                  onClick={() => {
                    availabilityHandler(el.id);
                  }}
                >
                  {el.availability ? (
                    <TbBox
                      style={{ color: "var(--green)", fontSize: "24px" }}
                    />
                  ) : (
                    <TbBoxOff style={{ color: "red", fontSize: "24px" }} />
                  )}
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
