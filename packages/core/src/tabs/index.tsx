import "./index.css";
import { useState, ReactNode, Children } from "react";
import { useRef, useEffect } from "react";
type Key = number | string;
interface TabItem {
  key: Key; // 唯一标识，必须存在
  label: ReactNode; // 标签内容（文本、图标、组件等）
  children: ReactNode; // 标签面板内容
  disabled?: boolean; // 是否禁用标签（点击无反应）
  className?: string; // 自定义标签样式类名
  icon?: React.ReactNode; // 标签前的图标（可选）
  hidden?: boolean; // 是否隐藏标签（可选）
  // 可根据需要添加更多属性，如权限控制、徽章等
  // badge?: React.ReactNode; // 标签上的徽章提示
}
interface Props {
  defaultActiveKey: Key;
  items: TabItem[];
  onChange: (key: Key) => void;
  className?: string;
  centered?: boolean;
}
const Tabs = ({
  defaultActiveKey,
  items,
  onChange,
  className,
  centered = false,
}: Props) => {
  const initialKey = defaultActiveKey ?? items[0]?.key; //1
  const [activeKey, setActiveKey] = useState(initialKey); //1

  const handleClick = (key) => {
    const tab = items.find((item) => item.key === key);
    if (tab?.disabled) return;
    setActiveKey(key);
    if (onChange) {
      onChange(key);
    }
  };

  const tabContent = items.find((item) => item.key === activeKey);

  return (
    <div>
      <div className="tab-whole">
        <div className={`tab-title ${centered ? "centered" : ""}`}>
          {items.map((tabSet) => (
            <div
              key={tabSet.key}
              className={`tab ${activeKey === tabSet?.key ? "active" : ""} ${tabSet?.disabled ? "disabled" : ""} ${className || ""} `}
              onClick={() => {
                handleClick(tabSet.key);
              }}
            >
              {tabSet?.label}
            </div>
          ))}
        </div>
        <div className="tab-body">{tabContent?.children || "tab1"}</div>
      </div>
    </div>
  );
};

export default Tabs;
