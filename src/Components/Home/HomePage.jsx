import React from "react";
import { Container, IconContainer, Wrapper } from "./styles";
import { FaHandHoldingUsd, FaWarehouse } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const links = [
    { id: 1, name: "SELL", icon: <FaHandHoldingUsd />, link: "/sell" },
    { id: 2, name: "INVENTORY", icon: <FaWarehouse />, link: "/inventory" },
  ];
  return (
    <Wrapper>
      <Container>
        {links.map((el) => (
          <IconContainer key={el.id} onClick={() => navigate(el.link)}>
            {el.icon}
            <h3>{el.name}</h3>
          </IconContainer>
        ))}
      </Container>
    </Wrapper>
  );
}
