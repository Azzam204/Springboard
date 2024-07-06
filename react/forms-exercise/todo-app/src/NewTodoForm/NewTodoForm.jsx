import { React, useState } from "react";

function NewTodoForm({ addTodo }) {

  const DEFAULT = {
    task: ''
  }

  const [formData, setFormData] = useState(DEFAULT);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    addTodo(formData);
    setFormData(DEFAULT);
  }


  return (
    <form className="NewTodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        name="task"
        placeholder="Todo"
        value={formData.task}
        onChange={handleChange}
      />
      <button>Add Todo!</button>
    </form>
  )
}

export default NewTodoForm