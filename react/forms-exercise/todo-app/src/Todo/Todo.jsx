import React from "react";
import '../App.css'


function Todo({task,delTodo}) {
  
  return (
    <>
      <div className="Todo">{task}
        <button onClick={delTodo}>x</button>
      </div>
    </>
  )
}


export default Todo
