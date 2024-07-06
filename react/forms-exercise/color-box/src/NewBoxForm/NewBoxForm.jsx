import { React, useState } from "react";

function NewBoxForm({ addBox }) {

  const DEFAULT = {
    height: '',
    width: '',
    color: 'red'
  };

  const [formData, setFormData] = useState(DEFAULT);

  const handleChange = evt => {
        const { name, value }= evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    addBox(formData);
    setFormData(DEFAULT);
  }


  return (
    <form onSubmit={handleSubmit} className="NewBoxForm">
      <div>
        <input
          type="color"
          id="color"
          name="color"
          placeholder="Box color"
          value={formData.color}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="number"
          id="height"
          name="height"
          placeholder="Box height"
          value={formData.height}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="number"
          id="width"
          name="width"
          placeholder="Box width"
          value={formData.width}
          onChange={handleChange}
        />
      </div>
      <button >Add Box!</button>
    </form>
  )
}

export default NewBoxForm