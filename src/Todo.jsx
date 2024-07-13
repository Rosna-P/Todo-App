import React, { useState } from "react";
import "./TodoPage.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline, IoMdRadioButtonOff } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid"; // uuid for unique key generation

const ItemType = "TODO";

const TodoItem = ({
  todo,
  index,
  moveTodo,
  handleToggleComplete,
  handleDeleteTodo,
  startEditing,
}) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTodo(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <li
      ref={(node) => ref(drop(node))}
      className={`todo-item ${todo.completed ? "completed" : ""}`}
    >
      {todo.image && <img src={todo.image} alt="Todo" />}
      <span>{todo.text}</span>
      <div className="button-group">
        <button onClick={() => handleToggleComplete(todo.id)}>
          {todo.completed ? (
            <IoMdRadioButtonOff />
          ) : (
            <IoMdCheckmarkCircleOutline />
          )}
        </button>
        <button onClick={() => handleDeleteTodo(todo.id)}>
          <RiDeleteBinLine />
        </button>
        <button onClick={() => startEditing(todo)}>
          <FiEdit />
        </button>
      </div>
    </li>
  );
};

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputImage, setInputImage] = useState(null);
  const [isGridView, setIsGridView] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleAddOrUpdateTodo = () => {
    if (inputValue.trim() === "") return;

    if (editingId) {
      // Update existing todo
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editingId
            ? { ...todo, text: inputValue, image: inputImage }
            : todo
        )
      );
      setEditingId(null);
    } else {
      // Add new todo
      const newTodo = {
        id: uuidv4(), // Assign a unique ID to each todo
        text: inputValue,
        image: inputImage,
        completed: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }

    setInputValue("");
    setInputImage(null);
  };

  const handleDeleteTodo = (todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  const handleToggleComplete = (todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setInputValue(todo.text);
    setInputImage(todo.image);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setInputImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      setInputImage(null);
    }
  };

  const toggleView = () => setIsGridView(!isGridView);

  const moveTodo = (fromIndex, toIndex) => {
    const updatedTodos = [...todos];
    const [movedTodo] = updatedTodos.splice(fromIndex, 1);
    updatedTodos.splice(toIndex, 0, movedTodo);
    setTodos(updatedTodos);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="todo-container">
        <h2>TODO APP</h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a task"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleAddOrUpdateTodo}>
          {editingId ? "Update" : "Add"}
        </button>
        <button onClick={toggleView}>
          {isGridView ? "List View" : "Grid View"}
        </button>
        <ul className={isGridView ? "grid-view" : ""}>
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              index={index}
              todo={todo}
              moveTodo={moveTodo}
              handleToggleComplete={handleToggleComplete}
              handleDeleteTodo={handleDeleteTodo}
              startEditing={startEditing}
            />
          ))}
        </ul>
      </div>
    </DndProvider>
  );
};

export default TodoPage;
