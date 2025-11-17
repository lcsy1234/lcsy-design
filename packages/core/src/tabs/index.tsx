import "./index.css";
import { useState, ReactNode, useRef, useEffect } from "react";

type Key = number | string;

interface TabItem {
  key: Key;
  label: ReactNode;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  hidden?: boolean;
}

interface Props {
  defaultActiveKey: Key;
  items: TabItem[];
  onChange: (key: Key) => void;
  className?: string;
  centered?: boolean;
  // 新增：允许自定义下划线样式
  indicatorColor?: string;
  indicatorHeight?: string;
}

const Tabs = ({
  defaultActiveKey,
  items,
  onChange,
  className,
  centered = false,
  indicatorColor = "#165DFF", // 默认蓝色
  indicatorHeight = "2px",
}: Props) => {
  const initialKey = defaultActiveKey ?? items[0]?.key;
  const [activeKey, setActiveKey] = useState(initialKey);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const tabRefs = useRef<Record<Key, HTMLDivElement | null>>({});//？
  const tabContainerRef = useRef<HTMLDivElement>(null);

  // 处理标签点击
  const handleClick = (key: Key) => {
    const tab = items.find((item) => item.key === key);
    if (tab?.disabled) return;
    setActiveKey(key);
    onChange?.(key);
  };

  // 更新下划线位置和宽度
  const updateIndicator = () => {
    if (!activeKey || !tabRefs.current[activeKey]) return;

    const activeTab = tabRefs.current[activeKey];
    const container = tabContainerRef.current;

    if (activeTab && container) {
      const { left, width } = activeTab.getBoundingClientRect();
      const containerLeft = container.getBoundingClientRect().left;

      setIndicatorStyle({
        width: `${width-25}px`,
        transform: `translateX(${left - containerLeft+9}px)`,
        backgroundColor: indicatorColor,
        height: indicatorHeight,
      });
    }
  };

  // 初始化和更新时计算下划线位置
  useEffect(() => {
    updateIndicator();
    // 监听窗口大小变化，重新计算位置
    window.addEventListener("resize", updateIndicator);//？
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeKey, items, indicatorColor, indicatorHeight]);

  const tabContent = items.find((item) => item.key === activeKey);

  return (
    <div className={`lcsy-tabs-container ${className || ""}`}>
      <div className="lcsy-tabs">
        <div
          ref={tabContainerRef}
          className={`lcsy-tabs-nav ${centered ? "centered" : ""}`}
        >
          {items.map((tabSet) => (
            <div
              key={tabSet.key}
              ref={(el) => {
                tabRefs.current[tabSet.key] = el;
              }}
              className={`lcsy-tabs-tab ${activeKey === tabSet?.key ? "active" : ""} ${tabSet?.disabled ? "disabled" : ""}`}
              onClick={() => handleClick(tabSet.key)}
              style={{ display: tabSet.hidden ? "none" : "flex" }}
            >
              {tabSet.icon && <span className="tab-icon">{tabSet.icon}</span>}
              {tabSet.label}
            </div>
          ))}
          <div className="lcsy-tabs-indicator" style={indicatorStyle} />
        </div>
        <div className="lcsy-tabs-content">{tabContent?.children}</div>
      </div>
    </div>
  );
};

export default Tabs;
