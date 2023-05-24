import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const BullAndCows = () => {
  const [gameNum, setGameNum] = useState([]);
  const userNum = useRef([]);
  const inputValue = useRef([]);
  const lockBtn = useRef([]);
  const inputEl = useRef([]);
  const [roundHint, setRoundHint] = useState([]);
  const [isLevel, setIsLevel] = useState(0);
  const [showLevel, setShowLevel] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [recordNum, setRecordNum] = useState(0);

  /* 
    game rules
    onClick과 연결된 isRules 메서드로
    배경 클릭 시 인덱스 1씩 증가하며 룰 li 순차 출력
    가장 마지막 인덱스가 끝나면 showRules가 false로 룰 요소 숨김 -> showLevel은 true 난이도 선택 창 출력
  */
  const rules = document.querySelectorAll("#game_rules li");
  let rulesIdx = 0;

  const isRules = (e) => {
    rulesIdx++;
    if (rulesIdx > rules.length - 1) {
      setShowRules(false);
      setShowLevel(true);
    }
    rules.forEach((rule, idx) => {
      rulesIdx === idx ? rule.classList.add("active") : rule.classList.remove("active");
    });
  };

  /*
    난이도 선택
    매개변수로 난이도에 맞는 length를 받아 isLevel state변경
    length에 맞는 input 요소 생성
  */
  const choiceLevel = (length) => {
    setShowLevel(false);
    setIsLevel(length);
    for (let i = 0; i < length; i++) {
      inputValue.current.push("");
    }
  };

  /*
    start game
    isLevel state값에 맞는 랜덤 숫자 배열 생성
    while문과 if문으로 중복되지 않는 숫자 생성, 첫번째 숫자가 0일 시 랜덤 숫자로 변경
    생성된 배열을 gameNum state에 할당
  */
  const createNum = () => {
    const arr = [];

    while (arr.length < isLevel) {
      const ran = Math.floor(Math.random() * 10);
      if (!arr.includes(ran)) {
        arr.push(ran);
      }
    }

    while (arr[0] === 0) {
      const ran = Math.floor(Math.random() * 10);
      arr[0] = ran;
    }

    setGameNum(arr);
  };

  // 난이도가 변경될 때마다 새로운 정답 배열 생성.
  useEffect(() => {
    createNum();
  }, [isLevel]);

  /*
    input focus
    최초 입력 시 순차적으로 input에 포커스
  */
  const inputArr = document.querySelectorAll("#input_num input");
  const nextFocus = (index, value) => {
    if (index < inputArr.length - 1 && value) {
      inputArr[index + 1].focus();
    }
  };

  /*
    submit 메서드
    1. input요소가 하나라도 비어있을 시 alert 출력
    2. 정답 배열과 비교할 숫자 배열을 만들기 위해 (입력받은 값 * 1) map 사용
    3. 입력했던 값을 라운드힌트에 출력하기 위해 문자열로 userValue 변수 할당
    4. forEach로 정답 배열과 입력 배열을 비교해 Strike, Ball 변경    
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.current.includes("")) {
      alert("숫자를 모두 입력해주세요.");
      return;
    }
    userNum.current = inputValue.current.map((num) => num * 1);
    const userValue = userNum.current.join("");
    let Strike = 0;
    let Ball = 0;
    userNum.current.forEach((user, userIdx) => {
      gameNum.forEach((ans, ansIdx) => {
        if (user === ans) {
          if (userIdx === ansIdx) {
            Strike++;
          } else {
            Ball++;
          }
        }
      });
    });
    // 비교한 결과에 따라 맞는 힌트 or 답 출력
    if (Strike || Ball) {
      if (!Strike) {
        setRoundHint([...roundHint, { value: userValue, hint: Ball + "B" }]);
      } else if (!Ball) {
        setRoundHint([...roundHint, { value: userValue, hint: Strike + "S" }]);
        if (Strike === inputValue.current.length) {
          alert("정답입니다!!");
          lockBtn.current.forEach((lock) => lock.classList.add("locked"));
          inputEl.current.forEach((input) => (input.disabled = true));
          // 클리어 라운드 수 기록.
          setRecordNum((prevRound) => {
            if (prevRound > roundHint.length + 1 || prevRound === 0) {
              return roundHint.length + 1;
            } else {
              return prevRound;
            }
          });
        }
      } else {
        setRoundHint([...roundHint, { value: userValue, hint: Strike + "S" + Ball + "B" }]);
      }
    } else {
      setRoundHint([...roundHint, { value: userValue, hint: "Out!!" }]);
    }
  };

  // 스트라이크가 확실한 input창 잠금 기능
  const toggleLock = (e) => {
    if (e.target.classList.contains("locked")) {
      e.target.classList.remove("locked");
      e.target.nextSibling.disabled = false;
    } else {
      e.target.classList.add("locked");
      e.target.nextSibling.disabled = true;
    }
  };

  // 다시하기 버튼
  const resetGame = () => {
    if (showLevel) {
      alert("난이도를 먼저 선택하세요");
      return;
    }
    createNum();
    inputValue.current = inputValue.current.map((val) => (val = ""));
    lockBtn.current.forEach((lock) => lock.classList.remove("locked"));
    inputEl.current.forEach((input) => {
      input.value = "";
      input.disabled = false;
    });
    setRoundHint([]);
  };

  return (
    <Container>
      {showRules && (
        <ul id="game_rules" onClick={isRules}>
          <li className="active">숫자 야구 게임</li>
          <li>숫자 야구는 임의의 4자리 숫자를 맞추는 게임입니다.</li>
          <li>사용자는 숫자를 입력하고 다음 규칙에 따라 힌트를 받습니다.</li>
          <li>입력한 숫자가 정답에 포함되지 않은 경우 "Out!"</li>
          <li>입력한 숫자가 정답에 포함되지만 위치가 다를 경우 "Ball!"</li>
          <li>입력한 숫자가 정답에 포함되며 위치가 같으면 "Strike!"</li>
          <li>예를 들어 정답이 1234일 때, 입력한 값이 4251이라면 "2 Strike", "1 Ball"이며</li>
          <li>"2S1B"로 힌트가 나타납니다.</li>
          <li>게임 라운드마다 받은 힌트는 오른쪽에 표시되며</li>
          <li>첫 번째 자리수에는 0이 등장하지 않습니다.</li>
          <li>그럼 시작하겠습니다.</li>
        </ul>
      )}
      {showLevel && (
        <ul id="level">
          <li>난이도 선택</li>
          <li onClick={() => choiceLevel(4)}>basic</li>
          <li onClick={() => choiceLevel(5)}>hard</li>
        </ul>
      )}
      <form id="input_num" onSubmit={handleSubmit}>
        {inputValue.current.map((_, idx) => (
          <fieldset key={idx}>
            <legend onClick={toggleLock} ref={(el) => (lockBtn.current[idx] = el)}>
              Lock
            </legend>
            <input
              type="text"
              maxLength={1}
              onChange={(e) => {
                nextFocus(idx, e.target.value);
                inputValue.current[idx] = e.target.value;
              }}
              ref={(input) => (inputEl.current[idx] = input)}
              onClick={(e) => {
                if (e.target.disabled) return;
                e.target.value = "";
              }}
              autoFocus={idx === 0 && true}
            />
          </fieldset>
        ))}
        <button type="submit" style={{ display: "none" }}></button>
      </form>
      <ul id="hint_box">
        Round Board
        {roundHint.map((hint, idx) => (
          <li key={idx}>
            {idx + 1}Round
            <p
              style={{
                color: `${hint.hint.includes("S") ? "green" : hint.hint.includes("B") ? "orange" : "red"}`,
              }}>
              {hint.value}
              <em>{hint.hint}</em>
            </p>
          </li>
        ))}
      </ul>
      {Boolean(isLevel) && (
        <ul id="menu">
          <li id="restart" onClick={resetGame}>
            다시하기
          </li>
          <li
            id="level_btn"
            onClick={() => {
              inputValue.current = [];
              setShowLevel(true);
              setRecordNum(0);
              setRoundHint([]);
            }}>
            난이도 선택
          </li>
        </ul>
      )}
      {Boolean(isLevel) && <p id="record">RECORD : {recordNum} Round</p>}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #000;
  #game_rules {
    color: #fff;
    user-select: none;
    width: 100%;
    height: 100vh;
    & li {
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      font-weight: bold;
      display: none;
      position: relative;
      &.active {
        display: flex;
      }
    }
  }
  #next_cursor {
    color: #fff;
    font-size: 24px;
    position: absolute;
    top: 0;
    left: 0;
    user-select: none;
    cursor: none;
  }
  #level {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 250px auto;
    color: #fff;
    position: absolute;
    text-align: center;
    li {
      font-weight: bold;
      font-size: 35px;
      margin: 50px 0;
      &:first-child {
        font-size: 50px;
        & ~ li {
          cursor: pointer;
          opacity: 0.5;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
  #input_num {
    display: flex;
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    legend {
      text-align: center;
      color: #000;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
      margin-bottom: 20px;
      background-color: #444;
      padding: 5px 10px;
      border-radius: 20px;
      &:hover {
        background-color: #fff;
      }
      &.locked {
        background-color: crimson;
      }
    }
    input {
      width: 50px;
      height: 50px;
      margin: 0 20px;
      font-size: 30px;
      text-align: center;
      cursor: pointer;
    }
  }
  #hint_box {
    width: 20%;
    height: 100vh;
    overflow: auto;
    color: #fff;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 99;
    font-size: 30px;
    text-align: center;
    padding: 20px;
    border-left: 1px solid #fff;
    box-sizing: border-box;
    li {
      display: flex;
      font-size: 20px;
      gap: 15px;
      margin: 30px 0;
      p {
        em {
          margin-left: 10px;
        }
      }
    }
  }
  #menu {
    color: #fff;
    cursor: pointer;
    font-weight: bold;
    font-size: 24px;
    margin: 30px 50px;
    position: absolute;
    & li {
      opacity: 0.6;
      margin: 20px 0;
      &:hover {
        opacity: 1;
      }
    }
  }
  #record {
    color: #fff;
    text-align: center;
    padding-top: 20px;
  }
`;

export default BullAndCows;
