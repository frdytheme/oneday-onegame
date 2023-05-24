import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../assets/fonts/font.css";
import gameDB from "../DB/GameDB";

function Main() {
  const navigate = useNavigate();
  const [gameNum, setGameNum] = useState(0);
  const checkGame = (e, game) => {
    const games = document.querySelectorAll("#game_list ul li");
    setGameNum(game.id);
    games.forEach((game) => game.classList.remove("checked"));
    e.target.classList.add("checked");
  };
  return (
    <MainPage>
      <div id="game_list">
        <p>MINI GAME</p>
        <ul>
          {gameDB.map((game) => (
            <li key={game.id} onClick={(e) => checkGame(e, game)}>
              {game.name}
            </li>
          ))}
        </ul>
      </div>
      <div id="game_info">
        <video src={gameDB[gameNum].video} loop autoPlay muted></video>
        {gameDB[gameNum].des.split("/").map((des, idx) => (
          <p key={idx}>{des}</p>
        ))}
      </div>
      {gameDB[gameNum].url ? (
        <a id="play_btn" href={gameDB[gameNum].url} target="_blank">
          PLAY
        </a>
      ) : (
        <div id="play_btn" onClick={() => navigate(gameDB[gameNum].nav)}>
          PLAY
        </div>
      )}
    </MainPage>
  );
}

const MainPage = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #000;
  font-family: "Neo", serif;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 8fr 2fr;
  color: #fff;
  div,
  a {
    border: 1px solid #fff;
  }
  #game_list {
    font-size: 48px;
    text-align: center;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    grid-row: span 2;
    position: relative;
    p {
      font-size: 100px;
      position: absolute;
      top: 80px;
    }
    li {
      margin: 15px 0;
      opacity: 0.5;
      position: relative;
      &.checked {
        opacity: 1;
        &::after {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border: 15px solid transparent;
          border-right-color: #fff;
          right: -50px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      &:hover {
        cursor: pointer;
        opacity: 1;
      }
    }
  }
  #game_info {
    video {
      width: 100%;
    }
    p {
      text-align: center;
      margin-top: 10px;
    }
  }
  #play_btn {
    grid-column: 2 / 2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 100px;
    cursor: pointer;
    opacity: 0.5;
    text-decoration: none;
    color: inherit;
    &:hover {
      opacity: 1;
    }
  }
`;

export default Main;
