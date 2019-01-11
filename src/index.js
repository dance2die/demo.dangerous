import React from "react";
import ReactDOM from "react-dom";

import dangerous from "./dangerous";

import "./styles.css";

// const Block = ({ ...props }) => <div {...props} />;

class Block extends React.Component {
  static count = 10;
  static increaseCount = () => console.log(++Block.count);
  static decreaseCount = () => console.log(--Block.count);

  render() {
    return <div {...this.props} />;
  }
}

// const Dangerous = dangerous.div`
const Dangerous = dangerous(Block)`
  <h1>Who am I?</h1>
  <p>Last Name is "${props => props.lastName}"</p>
  <p>First Name is "${props => props.firstName}"</p>
  <a href="javascript:alert('hi');">Show Alert</a>
`;

// console.log(`dangerous`, dangerous.div);
function App() {
  return (
    <div className="App">
      {Dangerous.count}
      <section>
        <button onClick={Dangerous.increaseCount}>Increase Block Count</button>
        <button onClick={Dangerous.decreaseCount}>Decrease Block Count</button>
      </section>
      <section>
        <Dangerous firstName="Sung" lastName="Kim" />
      </section>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
