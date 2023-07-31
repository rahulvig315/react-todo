/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";


const TodoItem = ({todo, onChange, onDelete}) => {
  return (
    <li key={todo.id}>
      <input
        type="checkbox"
        onChange={() => onChange(todo)}
        checked={todo.done}
      />
      <h3>
        Task {todo.id}: {todo.task}
      </h3>{" "}
      <button onClick={() => onDelete(todo)}>X</button>
    </li>
  );
}

function App() {
  const [newTaskInput, setNewTaskInput] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const showOrHide = showCompleted && 'Hide' || 'Show';
  const [todos, setTodos] = useState([
    {
      id: 1,
      task: "Example Todo",
      done: false,
    },
  ]);


  function addTodo() {
    let id = Math.max(0, ...todos.map(todo => todo.id)) + 1;
    if (newTaskInput) {
      setTodos((prev) => [
        ...prev,
        {
          id,
          task: newTaskInput,
          done: false,
        }
      ])
      setNewTaskInput('')
    }
  }

  function removeTodo(todo) {
    setTodos((prev) => prev.filter(t => t !== todo));
  }

  function updateTodoStatus(todo) {
    setTodos((prev) => [...prev.filter(t => t !== todo), {...todo, done: !todo.done}])
  }
  
  return (
    <div>
      <h1>Simple React Todos</h1>
      <div className="inputDiv">
        <input
          onChange={(e) => setNewTaskInput(e.target.value)}
          value={newTaskInput}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <div className="todoDiv">
        <div className="remaining">
          <h2>Tasks Remaining</h2>
          <ul>
            {todos.map(
              (todo) =>
                !todo.done && (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onChange={updateTodoStatus}
                    onDelete={removeTodo}
                  />
                )
            )}
          </ul>
        </div>

        <button onClick={() => setShowCompleted(!showCompleted)}>
          {showOrHide} Completed
        </button>

        {showCompleted && (
          <div className="completed">
            <h2>Completed Tasks</h2>
            <ul>
              {todos.map(
                (todo) =>
                  todo.done && (
                    <li key={todo.id}>
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        onChange={updateTodoStatus}
                        onDelete={removeTodo}
                      />
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
