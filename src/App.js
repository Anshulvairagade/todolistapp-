import { useEffect, useState } from "react";
import "./App.css";

const getLocalTodos = () => {
  const list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  }
  else {
    return []
  }
}
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(getLocalTodos());
  const [editId, setEditId] = useState(null);
  // {id: todo.id, data: todo.data}
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      const editedTodo = todos.map((elem) =>
        elem.id === editId ? {id: elem.id, data: todo} : elem
      );
      setTodos(editedTodo);
      setEditId(null);  
      setTodo("");
      
    }
    else if (todo !== "") {
      const allInputData = {
        id: new Date().getTime().toString(),
        data: todo,
      };
      setTodos([...todos, allInputData]);
      setTodo("");
    }
  };
  const deleteTodo = (id) => {
    const delTodo = todos.filter((t) => t.id !== id);
    setTodos(delTodo);
  };
  const editTodo = (id) => {
    const editTodo = todos.find((t) => t.id === id);
    setTodo(editTodo.data);
    setEditId(id);
  };
  const clearAll = () => {
    setTodos([])
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(todos))
  }, [todos])
  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
        <form className="todoForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter todo...."
          />
          <button type="submit">{editId ? "Edit Todo" : "Add Todo"}</button>
        </form>
        <ul className="allTodos">
          {todos.map((t) => (
            <li className="singleTodo">
              <span className="todoText">{t.data}</span>
              <button className="edit" onClick={() => editTodo(t.id)}>
                Edit
              </button>
              <button className="delete" onClick={() => deleteTodo(t.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button className="clearAll" onClick={clearAll}>Clear All todos</button>
      </div>
    </div>
  );
}

export default App;
