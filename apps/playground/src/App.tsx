import { useState } from "react";
import ModalPlay from "./assets/component/modal";

function App() {
  const [value, setValue] = useState("");
  return (
    <>
      <ModalPlay></ModalPlay>
      {/* <Child onValueChange={setValue} />; */}
    </>
  );
}
function Child() {
   
  // return <input onChange={(e) => onValueChange(e.target.value)} />;
}

export default App;
