import { useState } from "react";
import MenuItem from "./MenuItem";
// import "./index.css";
export default function Menu() {
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
  // 状态1：管理“展开/折叠”（对象存储，key为菜单项key，值为是否展开）
  const [openKeys, setOpenKeys] = useState(() => {
    // 初始化时，找到默认展开的父菜单（示例中无，可自定义）
    return {};
  });

  // 状态2：管理“选中项”（初始选中defaultActive为true的项）
  const [selectedKey, setSelectedKey] = useState(() => {
    // 递归查找默认选中项
    function findDefaultActive(item) {
      if (item.defaultActive) return item.key;
      if (item.children) {
        for (const child of item.children) {
          const result = findDefaultActive(child);
          if (result) return result;
        }
      }
      return null;
    }
    let defaultKey = null;
    for (const item of menuData) {
      defaultKey = findDefaultActive(item);
      if (defaultKey) break;
    }
    return defaultKey || "";
  });

  return (
    <div className="menu-container">
      {menuData.map((item) => (
        <MenuItem
          key={item.key}
          item={item}
          openKeys={openKeys}
          setOpenKeys={setOpenKeys}
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey}
        />
      ))}
    </div>
  );
}
