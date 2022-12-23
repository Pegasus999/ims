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
    if (query) {
      setProductList(
        products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setProductList(products);
    }
  }
  function iconHandler() {
    if (searchMode === "text") {
      setSearchMode("code");
    } else {
      setSearchMode("text");
    }
  }
  function ScanHandler(code) {
    if (searchMode === "code") {
      setQuery(code);
      setProductList(products.filter((product) => product.codebar === code));
    }
  }

  useScanDetection({
    onComplete: (code) => ScanHandler(code),
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
          <DeleteButton disabled={selected.length === 0 ? true : false}>
            DELETE
          </DeleteButton>
        </Flex>
      </Flex>
      <Flex jc="flex-start" gap="40px" style={{ padding: "0 20px" }}>
        <div style={{ width: "93px" }}></div>
        <ColumnName style={{ width: "150px" }}>Name</ColumnName>
        <ColumnName>Price</ColumnName>
        <ColumnName>Wholesale price</ColumnName>
        <ColumnName>BarCode</ColumnName>
      </Flex>
    </Filters>
  );
}
