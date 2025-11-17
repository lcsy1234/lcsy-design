import { useState } from "react";
import MenuItem from "./MenuItem";
// / 1. 定义菜单项类型
interface MenuItemType {
  key: string;
  label: string;
  icon?: string;
  defaultActive?: boolean;
  children?: MenuItemType[];
}

// 2. 定义组件的 props 类型（包含 menuData）
interface MenuProps {
  menuData: MenuItemType[]; // 声明接收 menuData，类型为菜单项数组
}

export default function Menu({menuData}: MenuProps) {
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
    <div className="lcsy-menu" role="menu">
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
