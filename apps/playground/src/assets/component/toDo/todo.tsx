import { useState } from "react";

export default function Todos() {
  const [inputValue, setInputValue] = useState("");
  const [toDos, setTodos] = useState([
    {
      id: Date.now(),
      text: "111",
      isComplete: false,
    },
  ]);
  const handleAdd = () => {
    if (!inputValue.trim()) return;
    const newAdd = { id: Date.now(), text: inputValue, isComplete: false };
    setTodos((prev) => [...prev, newAdd]);
    setInputValue("");
  };
  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };
  const handleDelete=(id:number)=>{
    setTodos(prev=>prev.filter(todo=>todo.id!==id))
  }
  return (
    <>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />{" "}
        <span onClick={handleAdd}>添加</span>
      </div>
      <div>
        <ul>
          {toDos.map((todo) => (
            <li key={todo.id}>
              <span className="item" style={{textDecoration:todo.isComplete?"line-through":"none"}}> {todo.text}</span>
              <span
                className="item"
                onClick={() => {
                  handleToggle(todo.id);
                }}
              >
                {!todo.isComplete ? "未完成" : "已完成"}
              </span>
              <span className="item" onClick={()=>{handleDelete(todo.id)}}>删除</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
