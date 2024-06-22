
const App = () => (
    <div>
        <Person name='Azzam' age={33} hobbies = {['swimming','climbing','coding']} />
        <Person name='barthalomeu' age={33} hobbies = {['acting','driving','racing']} />
        <Person name='Moses' age={33} hobbies = {['praying','parting seas','long walks in the desert']} />
    </div>
)

ReactDOM.render(<App />, document.getElementById("root"))