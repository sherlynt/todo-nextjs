"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "todos",
      JSON.stringify(todos)
    );
  }, [todos]);

  function addTodo() {
    if (!task.trim()) return;

    setTodos([
      ...todos,
      {
        text: task,
        completed: false,
      },
    ]);

    setTask("");
  }

  return (
    <div className="container">
      <h1>Your To Do</h1>

      <div className="input-area">
        <input
          id="todo-input"
          type="text"
          placeholder="Add new task"
          value={task}
          onChange={(e) =>
            setTask(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
        />

        <button
          id="add-btn"
          onClick={addTodo}
        >
          +
        </button>
      </div>

      <ul id="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>
            <div className="left">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  const updated = [...todos];

                  updated[index].completed =
                    !updated[index]
                      .completed;

                  setTodos(updated);
                }}
              />

              <span
                className={
                  todo.completed
                    ? "completed"
                    : ""
                }
              >
                {todo.text}
              </span>
            </div>

            <button
              className="edit-btn"
              onClick={() => {
                const newText = prompt(
                  "Edit todo:",
                  todo.textz
                );

                if (
                  newText &&
                  newText.trim()
                ) {
                  const updated = [
                    ...todos,
                  ];

                  updated[index].text =
                    newText.trim();

                  setTodos(updated);
                }
              }}
            >
              ✎
            </button>

            <button
              className="delete-btn"
              onClick={() => {
                setTodos(
                  todos.filter(
                    (_, i) =>
                      i !== index
                  )
                );
              }}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <div className="bottom-text">
        <h3>
          Your remaining todos :
          {
            todos.filter(
              (todo) =>
                !todo.completed
            ).length
          }
        </h3>

        <p>
          "I trust and believe that eveything is always working out for my highest good"
        </p>
      </div>
    </div>
  );
}
