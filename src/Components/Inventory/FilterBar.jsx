import React, { useState } from "react";
import { Flex } from "../Shared/Flex";
import {
  ColumnName,
  DeleteButton,
  Filters,
  IconContainer,
  SearchBar,
} from "./styles";
import { MdSearch } from "react-icons/md";
import { RiCloseCircleFill, RiBarcodeBoxLine } from "react-icons/ri";
import useScanDetection from "use-scan-detection";

export default function FilterBar({ selected, setProductList, products }) {
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState("text");
  function queryHandler(query) {
    setQuery(query);
    if (query === "") {
      setProductList(products);
    } else if (searchMode !== "code") {
      setProductList(
        products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else if (searchMode === "code") {
      setProductList(
        products.filter((product) => product.barcode.includes(query))
      );
    }
  }
  function iconHandler() {
    if (searchMode === "text") {
      setSearchMode("code");
    } else {
      setSearchMode("text");
    }
  }

  useScanDetection({
    onComplete: (code) => queryHandler(code),
  });
  return (
    <Filters>
      <Flex style={{ padding: "20px" }} jc="space-between">
        <div style={{ position: "relative" }}>
          <SearchBar
            placeholder="Search"
            type="text"
            onChange={(e) => queryHandler(e.target.value)}
            value={query}
          />
          <IconContainer
            align="left"
            onClick={() => {
              iconHandler();
            }}
          >
            {searchMode === "text" ? <RiBarcodeBoxLine /> : <MdSearch />}
          </IconContainer>
          {query && (
            <IconContainer align="right" onClick={() => setQuery("")}>
              <RiCloseCircleFill />
            </IconContainer>
          )}
        </div>
        <Flex>
          <DeleteButton
            disabled={selected.length === 0 ? true : false}
            onClick={() => window.Delete(selected)}
          >
            DELETE
          </DeleteButton>
        </Flex>
      </Flex>
      <Flex jc="flex-start" gap="40px" style={{ padding: "0 20px" }}>
        <div style={{ width: "90px" }}></div>
        <ColumnName style={{ width: "150px" }}>Name</ColumnName>
        <ColumnName>Price</ColumnName>
        <ColumnName>Availability</ColumnName>
        <ColumnName>Wholesale price</ColumnName>
        <ColumnName>BarCode</ColumnName>
      </Flex>
    </Filters>
  );
}
