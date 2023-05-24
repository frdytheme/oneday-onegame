import memoryGame from "../assets/videos/memorygame.webm";
import bullsandcows from "../assets/videos/bullsandcows.webm"

let id = 0;

export default [
  {
    id: id++,
    name: "카드뒤집기",
    video: memoryGame,
    url: "https://frdytheme.github.io/MemoryGame/",
    des: "Vue.js를 공부할 겸 만들어본 카드 뒤집기 게임입니다./랜덤 이미지 호출 후 객체 배열로 만들고 순서를 섞어 같은 id를 진 이미지만 뒤집히도록 했고/ref로 배열 길이를 조절해 난이도를 조작할 수 있게 작업했습니다.",
  },
  { id: id++, name: "숫자야구", video: bullsandcows, url: ".#/bullsandcows", des: "React로 작업한 숫자야구 게임입니다./Math.random을 사용해 랜덤 숫자 배열을 만들고/useState, useRef, 배열 메서드 등을 활용해 조건에 따라 Round Hint가 제공되도록 작업했습니다." },
];
