// import { useEffect, useState, useRef } from "react";
// import ModalPlay from "./assets/component/modal";
import {Tabs} from "lcsy-design";
function App() {
  const onChange = (key: number|string) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Tab 1",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
      disabled: true,
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey="1" 
      centered
      items={items} onChange={onChange} />;
      {/* <ModalPlay></ModalPlay> */}
    </>
  );
}

export default App;
