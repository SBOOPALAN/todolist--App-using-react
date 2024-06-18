import React, { useState } from "react";
import './App.css';

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const updatedTodos = todos.map((t) => 
        t.id === editId ? { id: t.id, todo } : t
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((t) => t.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <div className='App'>
      <div className='container'>
        <h1>Todo List App</h1>
        <form className="TodoForm" onSubmit={handleSubmit}>
          <input 
            type='text' 
            value={todo} 
            onChange={(e) => setTodo(e.target.value)} 
          />
          <button type="submit">{editId ? "Edit" : "Go"}</button>
        </form>
        <ul className='allTodos'>
          {todos.map((t) => (
            <li key={t.id} className='singleTodo'>
              <span className='todoText'>{t.todo}</span>
              <button onClick={() => handleEdit(t.id)}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
