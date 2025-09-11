import { Menu } from "lcsy-design";

export const MenuFunc=()=>{
      const menuData = [
  {
    key: "nav1",
    label: "Navigation One",
    icon: "📧", // 假设用自定义Icon组件，也可传React元素
    defaultActive: true,
    children: [
      {
        key: "item1",
        label: "Item 1",
        children: [
          { key: "option1", label: "Option 1" },
          { key: "option2", label: "Option 2" }, // 初始选中
        ],
      },
      {
        key: "item2",
        label: "Item 2",
        children: [
          { key: "option3", label: "Option 3" },
          { key: "option4", label: "Option 4" },
        ],
      },
    ],
  },
  {
    key: "nav2",
    label: "Navigation Two",
    icon: "👅",
    children: [
      { key: "option5", label: "Option 5" },
      { key: "option6", label: "Option 6" },
    ],
  },
  {
    key: "nav3",
    label: "Navigation Three",
    icon: "⚙️",
  },
];
return (
    <Menu menuData={menuData}></Menu>
)
}