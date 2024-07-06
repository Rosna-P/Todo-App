import React, { useState } from "react";
import "./TodoPage.css";
import { RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline, IoMdRadioButtonOff } from "react-icons/io";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputImage, setInputImage] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo = {
      text: inputValue,
      image: inputImage,
      completed: false,
    };

    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? newTodo : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, newTodo]);
    }

    setInputValue("");
    setInputImage(null);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    setInputValue(todos[index].text);
    setInputImage(todos[index].image);
    setEditIndex(index);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setInputImage(null);
    }
  };

  return (
    <div className="todo-container">
      <h2>TODO APP</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a task"
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleAddTodo}>
        {editIndex !== null ? "Update" : "Add"}
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            {todo.image && <img src={todo.image} alt="Todo" />}
            <span>{todo.text}</span>
            <div className="button-group">
              <button onClick={() => handleEditTodo(index)}>
                <RiEdit2Line />
              </button>
              <button onClick={() => handleDeleteTodo(index)}>
                <RiDeleteBinLine />
              </button>
              <button onClick={() => handleToggleComplete(index)}>
                {todo.completed ? (
                  <IoMdRadioButtonOff />
                ) : (
                  <IoMdCheckmarkCircleOutline />
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
