import { useState } from "react";
import "./index.css";
// 假设的Icon组件（也可使用React Icons等第三方库）
function Icon({ type }) {
  return <span className={`icon icon-${type}`}>{type}</span>;
}

export default function MenuItem({
  item,
  openKeys,
  setOpenKeys,
  selectedKey,
  setSelectedKey,
}) {
  // 1. 状态判断：当前项是否展开、是否选中
  const isOpen = openKeys[item.key] || false;//这里设置的是是否打开
  const isActive = selectedKey === item.key;

  // 2. 点击父菜单标题：切换“展开/折叠”
  const handleTitleClick = (key) => {
    console.log("%c Line:21 🍩 key", "color:#b03734", key);
    if (item.children && item.children.length > 0) {
      setOpenKeys((prev) => {
        console.log("%c Line:24 🍉 prev", "color:#ffdd4d", prev);
        return {
          ...prev,
          [item.key]: !isOpen,
        };
      });
    }
  };
  //为什么是{}不应该是nav1:true吗

  // 3. 点击菜单项：切换“选中状态”（若无子菜单，视为可点击选项）
  const handleOptionClick = () => {
    if (!item.children || item.children.length === 0) {
      setSelectedKey(item.key);
    }
  };

  return (
    <div
      className={`menu-item ${isActive ? "menu-item-active" : ""}`}
      // 若有子菜单，点击标题；否则点击整个项
      onClick={
        (e)=>{
          e.stopPropagation();
          console.log("%c Line:46 🥛 onClick", "color:#4fff4B", item.key);
          if(item.children){
            handleTitleClick(item.key);
          } else {
            handleOptionClick();
          }
        }
        
      }
    >
      {/* 菜单项内容（图标 + 文本 + 展开箭头） */}
      <div className="menu-item-title">
        {item.icon && <Icon type={item.icon} />}
        <span>{item.label}</span>
        {/* 仅当有子菜单时，显示展开/折叠箭头 */}
        {item.children && item.children.length > 0 && (
          <Icon type={isOpen ? "👆" : "👇"} />
        )}
      </div>

      {isOpen && item?.children?.length > 0 && (
        <div className="submenu">
          {item.children.map((child) => (
            <MenuItem
              key={child.key}
              item={child}
              openKeys={openKeys}
              setOpenKeys={setOpenKeys}
              selectedKey={selectedKey}
              setSelectedKey={setSelectedKey}
            />
          ))}
        </div>
      )}
    </div>
  );
}
