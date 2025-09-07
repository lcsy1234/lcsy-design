import { use } from "react";
import { useState } from "react";
// import "./index.css";

// 思路：菜单组件；先设置默认的样式和功能，后续再完善，首先是navigation的功能
export default function Menu() {
  const prefix = "lcsy-menu";
  const items = [
    {
      key: "sub1",
      label: "NAVIGATION ONE",
      disabled: true,
      Children: [
        {
          key: "g1",
          label: "item1",
          Children: [
            {
              key: "1",
              label: "option1",
            },
            { key: "2", label: "option2" },
          ],
        },
        { key: "g2", label: "item2" },
      ],
    },
    {
      key: "sub2",
      label: "Navigation Two",
    },
    {
      key: "sub3",
      label: "Navigation Three",
    },
  ];
  const [menuArrs, setMenuArrs] = useState([
    {
      key: "1",
      label: "Navigation One",
      isOpen: true,
    },
  ]);
  function ChildrenFunc(items) {
    console.log("%c Line:40 🥓 menuArrs", "color:#2eafb0", menuArrs);
    items.map((item) => {
      setMenuArrs([
        ...menuArrs,
        {
          key: item.key,
          label: item.label,
          isOpen: true,
        },
      ]);
      if (item?.Children?.length > 0) {
        ChildrenFunc(item.Children);
      }
    });
  }
  ChildrenFunc(items);
  return (
    <div>
      <div className={`${prefix}-container`}>
        <div className={`${prefix}-menu-container`}></div>
        {menuArrs.map((item) =>
          item.isOpen ? (
            <div key={item.key} className={`${prefix}-menu-item`}>
              {item.label}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
