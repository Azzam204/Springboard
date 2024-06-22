const Person = ({ name, age, hobbies=[] }) => (
    <div>
        <p>Learn some information about this person</p>
        <ul>
            <li>Name: {name.length > 8 ? name.slice(0,6) : name }</li>
            <li>Age: {age}</li>
        </ul>
        <h3>{age > 17 ? "please go vote!" : "you must be 18"}</h3>
        <b>Hobbies :</b>
        <ul>
            { hobbies.map(h => <li>{h}</li>) }
        </ul>
    </div>
)