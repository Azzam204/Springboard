import { React, useState } from "react";
import "../App.css"
import Todo from "../Todo/Todo";
import NewTodoForm from "../NewTodoForm/NewTodoForm";
import {v4 as uuid} from "uuid"


function TodoList() {
  const [todos, setTodos] = useState([])
  
  const addTodo = todo => {
    let newTodo = { ...todo, id: uuid() };
    setTodos(todos => [...todos, newTodo]);
  }

  const delTodo = todo => {
    setTodos(todos.filter(t => t !== todo));
  }

  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      <ul className="Todolist">
        {todos.map(todo => (
          <li key={todo.id}>
            <Todo
              task= {todo.task}
              delTodo={() => delTodo(todo)}
            />
          </li>
        ))}
      </ul>

    </>
  )
}

export default TodoList