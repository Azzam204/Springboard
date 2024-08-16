import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

function ColorForm({ addColor }) {
  const DEFAULT = {
    name: '',
    value: ''
  }

  const navigate = useNavigate()

  const [formData, setFormData] = useState(DEFAULT)

  const handleSubmit = (e) => {
    e.preventDefault();
    addColor(formData);
    navigate('/')
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fData => ({
      ...fData,
      [name]:value
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter name for the color"
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="color"
          name="value"
          value={formData.value}
          onChange={handleChange}
        />
      </div>
      <div><button>Add this color</button></div>
    </form>
  )
}

export default ColorForm;