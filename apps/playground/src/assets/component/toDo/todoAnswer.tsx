import { useReducer, useState } from "react";
interface Todo {
  id:number,
  text?:string,
  completed?:boolean
}
// type TodoAction = 
//   | { type: 'ADD_TODO'; text: string }
//   | { type: 'TOGGLE_TODO'; id: number }
//   | { type: 'DELETE_TODO'; id: number };
interface TodoAction{
  type:string,
  text?:string,
  id?:number
}
//模版
function todoReducer(state:Todo[], action:TodoAction):Todo[] {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), text: action.text, completed: false },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state; // 必须返回默认状态
  }
}

export  function TodoListWithUseReducer(){
  const [todos, dispatch] = useReducer(todoReducer, []as Todo[]);
  const [inputValue, setInputValue] = useState(""); 

  const handleAddTodo = () => {
    if (!inputValue.trim()) return;
    dispatch({ type: "ADD_TODO", text: inputValue }); 
    setInputValue("");
  };

  const handleToggle = (id:number) => {
    dispatch({ type: "TOGGLE_TODO", id });
  };

  const handleDelete = (id:number) => {
    dispatch({ type: "DELETE_TODO", id });
  };

  // 渲染部分与 useState 版本完全相同
  return (
    <div>
      <input
        value={inputValue}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        placeholder="输入待办事项"
      />
      <button onClick={handleAddTodo}>添加</button>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
            <button onClick={() => handleToggle(todo.id)}>
              {todo.completed ? "未完成" : "完成"}
            </button>
            <button onClick={() => handleDelete(todo.id)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
//自己写的
 const todoListFunc = (state:Todo[], action:TodoAction):Todo[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), text: action.text, completed: false },
      ];
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state; // 必须返回默认状态
  }
};

 export function TodoListWithUseReducerCopy() {
  const [todos, dispatch] = useReducer(todoListFunc, []);
  const [inputValue, setInputValue] = useState("");
  const handdleAdd = () => {
    if (!inputValue.trim()) return;
    dispatch({ type: "ADD_TODO", text: inputValue });
    setInputValue("");
  };
  const handleDelete = (id:number) => {
    dispatch({ type: "DELETE_TODO", id });
  };
  const handleToggle = (id:number) => {
    dispatch({ type: "TOGGLE_TODO", id });
  };
  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="输入待办事项"
      />
      <button onClick={handdleAdd}>添加</button>
      <ul>
        {todos.map((item) => (
          <>
            <li
              key={item.id}
              style={{
                textDecoration: item.completed ? "line-through" : "none",
              }}
            >
              {item.text}
              <button
                onClick={() => {
                  handleToggle(item.id);
                }}
              >
                {item.completed ? "未完成" : "完成"}
              </button>
              <button
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                删除
              </button>
            </li>{" "}
          </>
        ))}
      </ul>
    </>
  );
}