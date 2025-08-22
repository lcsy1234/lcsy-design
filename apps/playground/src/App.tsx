import { Tabs } from "lcsy-design";
import {TodoListWithUseReducer, TodoListWithUseReducerCopy} from './todo'
const TabsParent = () => {
  //切换tab的时候的回调函数
  const onChange = (key: number | string) => {
    console.log("%c Line:39 🥤 key", "color:#465975", key);
  };
  const items = [
    {
      key: "1",
      label: "Tab1",
      children: "tab1",
    },
    {
      key: "2",
      label: "Tab2",
      children: "tab2",
    },
    {
      key: "3",
      label: "Tab3",
      children: "tab3",
    },
  ];
  return (
    <Tabs
      defaultActiveKey="2"
      items={items}
      onChange={onChange}
      className="tab-body-color"
    ></Tabs>
  );
};


function App() {
  return (
    <>
      <TabsParent />

      <TodoListWithUseReducer></TodoListWithUseReducer>
      <TodoListWithUseReducerCopy></TodoListWithUseReducerCopy>
    </>
  );
}

export default App;
