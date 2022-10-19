import React, { useState } from "react";
import { Flex } from "../Shared/Flex";
import {
  ColumnName,
  DeleteButton,
  EditButton,
  Filters,
  IconContainer,
  SearchBar,
} from "./styles";
import { MdSearch } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";

export default function FilterBar({ selected }) {
  const [query, setQuery] = useState("");

  function queryHandler() {
    if (query) {
    }
  }

  return (
    <Filters>
      <Flex style={{ padding: "20px" }} jc="space-between">
        <div style={{ position: "relative" }}>
          <SearchBar
            placeholder="Search"
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <IconContainer align="left" onClick={queryHandler}>
            <MdSearch />
          </IconContainer>
          {query && (
            <IconContainer align="right" onClick={() => setQuery("")}>
              <RiCloseCircleFill />
            </IconContainer>
          )}
        </div>
        <Flex gap="20px">
          <DeleteButton disabled={selected.length === 0 ? true : false}>
            DELETE
          </DeleteButton>
          <EditButton disabled={selected.length === 0 ? true : false}>
            Edit
          </EditButton>
        </Flex>
      </Flex>
      <Flex jc="flex-start" gap="40px" style={{ padding: "0 20px" }}>
        <input type="checkbox" />
        <div style={{ width: "40px" }}></div>
        <ColumnName style={{ width: "250px" }}>Name</ColumnName>
        <ColumnName>Price</ColumnName>
        <ColumnName>Wholesale price</ColumnName>
        <ColumnName>Quantity</ColumnName>
        <ColumnName>BarCode</ColumnName>
      </Flex>
    </Filters>
  );
}
