// import { useEffect, useState, useRef } from "react";
import { Select } from "lcsy-design";

function SelectApp() {
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
          { value: "jasi", label: "Jasi" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
          { value: "disabled", label: "Disabled", disabled: true },
        ]}
      />
    </>
  );
}

export default SelectApp;