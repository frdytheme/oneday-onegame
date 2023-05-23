import BullAndCows from "./components/BullAndCows";
import { Reset } from "styled-reset";
import Main from "./components/Main";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Reset />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/bullsandcows" element={<BullAndCows />} />
      </Routes>
      {/* <BullAndCows /> */}
    </>
  );
}

export default App;
