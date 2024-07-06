import { React, useState } from "react";
import Box from "../Box/Box";
import NewBoxForm from "../NewBoxForm/NewBoxForm";
import { v4 as uuid } from "uuid"
import "../App.css"

function BoxList() {
  const [boxes, setBoxes] = useState([])

  const addBox = box => {
    let newBox = { ...box, id: uuid() };
    setBoxes(boxes => [...boxes, newBox]);
  }

  const delBox = box => {
    setBoxes(boxes.filter(b => b !== box));
  }


  return (
    <>
      <div className="BoxList">
        {boxes.map(box => (
          <Box key={box.id}
            color={box.color}
            height={box.height}
            width={box.width}
            delBox={() => delBox(box)}
          />
        ))}
      </div>
      <NewBoxForm addBox={addBox} />
    </>
  )
}

export default BoxList