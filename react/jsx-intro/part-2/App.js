
const today = new Date().toLocaleDateString()

const App = () => (
    <div>
        <Tweet username= 'azzam204' name="Azzam" date = {today} msg = 'My first tweet'/>
        <Tweet username= 'pDubs' name="Paul" date = {today} msg = 'Paul Walker jr was here'/>
        <Tweet username= 'bobsUruncle' name="John" date = {today} msg = 'Hello world!'/>
    </div>
)

ReactDOM.render(<App />, document.getElementById("root"))