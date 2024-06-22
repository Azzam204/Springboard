import { useState } from "react";
import './App.css'


const EightBall = ({answers}) => {
    
    const defAns = {
        msg: 'Think of a Question',
        color: 'black'
    }

    const [answer, setAnswer] = useState(defAns);

    const handleFortune = () => (
        setAnswer(answers[Math.floor(Math.random() * answers.length)])
    )


    return (
        <>
            <div className="ball" style={{ backgroundColor: answer.color }} onClick={handleFortune}>
                <h1 className="answer">{answer.msg}</h1>
            </div>
            <button onClick={() => setAnswer(defAns)} >Reset!</button>
        </>
    )
}

export default EightBall