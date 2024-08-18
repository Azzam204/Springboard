import React from "react";
import JokeList from "./JokeList";

/** App component. Renders list of jokes. */

function App() {
  return (
    <div className="App">
      <JokeList />
    </div>
  )
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <JokeList />
//       </div>
//     );
//   }
// }

export default App;
