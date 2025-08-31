// import { useEffect, useState, useRef } from "react";
import ModalPlay from "./assets/component/modal";
import { Select } from "lcsy-design";

function App() {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <Select
        defaultValue="lucy"
        onChange={handleChange}
        style={{ width: 120 }}
        options={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
          { value: "disabled", label: "Disabled", disabled: true },
        ]}
      />
      <ModalPlay></ModalPlay>
      {/* <Child onValueChange={setValue} />; */}
    </>
  );
}

export default App;
