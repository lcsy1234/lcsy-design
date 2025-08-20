import { ReactNode } from "react";
import './index.css';
interface TabsProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

const Tabs = ({ children, className, appName }: TabsProps) => {
  return (
    <div>
      <div className="tab-whole">
        <div className="tab-title">
          <div className="tab">tab1</div>
          <div className="tab">tab2</div>
          <div className="tab">tab3</div>
        </div>
        <div className="tab-body">{children}</div>
      </div>
    </div>
  );
};
export default Tabs;