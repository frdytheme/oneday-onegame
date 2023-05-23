import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Main() {
  const navigate = useNavigate();
  return (
    <MainPage>
      <li onClick={() => navigate("/bullsandcows")}>카드뒤집기</li>
      <li>숫자야구</li>
    </MainPage>
  );
}

const MainPage = styled.ul`
  width: 100%;
  height: 100vh;
  background-color: #000;
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  li {
    width: 30%;
    height: 40%;
    background-color: #fff;
    color: #000;
    &:hover {
      cursor: pointer;
    }
  }
`;

export default Main;
