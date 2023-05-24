# 1-Day 1-Minigame Project
![image](https://github.com/frdytheme/oneday-onegame/assets/113487049/ee85b8fb-418e-42f1-baf6-923c756868fc)
### JavaScript와 React를 공부할 겸 간단한 로직으로 구현 가능한 게임을 만드는 것이 목적.
---
#### 사용 기술
* HTML5 & CSS3
* JavaScript
* React
* Vue

### 숫자야구
고등학생 때 친구랑 자주 했던 기억이 나서 게임으로 만들어봤다.

1. 난이도 선택에 따라 4, 5자리 수의 랜덤 숫자 배열을 만든다 -> 정답 배열
2. input에 입력된 값을 배열에 담는다 -> 사용자 배열
3. 두 배열의 값과 인덱스를 forEach로 비교하며 let변수 Strike와 Ball의 값을 바꾼다.
4. Strike와 Ball의 값을 받아 힌트를 제공하며 모두 Strike가 될 때까지 게임 진행.
5. 가장 적은 수로 클리어한 Round가 화면 상단에 기록된다.
6. 
##### [숫자야구 github-js파일 뜯어보기](https://github.com/frdytheme/oneday-onegame/blob/main/src/components/BullAndCows.js)

### 카드뒤집기
Vue를 공부하고 간단하게 뭘 만들까 생각하다가 미니게임으로 유명한 카드 뒤집기 게임을 만들었다.

1. id, checked, 랜덤 이미지를 호출하는 url 등의 키를 가진 ref 객체 배열을 생성.
2. for반복문과 구조분해할당을 통해 배열을 무작위로 섞는다.
3. grid 레이아웃으로 카드를 배치하고 @click 이벤트 디렉티브를 연결해 클릭한 카드의 객체 중 id값을 ref변수에 전달
4. 1번과 2번 ref가 같으면 forEach를 통해 해당 id를 가진 객체의 checked 속성이 true로 변경되며 오픈된 상태를 유지
5. 같은 카드가 오픈될 때마다 totalCount가 올라가며 배열의 총 길이 / 2와 같아지면 게임 클리어.

##### [카드뒤집기 github-vue파일 뜯어보기](https://github.com/frdytheme/MemoryGame/blob/main/src/App.vue)

---

# [게임하러가기](https://frdytheme.github.io/oneday-onegame/)

