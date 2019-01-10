import React from "react";
import ReactDOM from "react-dom";

import dangerous from "./dangerous";

import "./styles.css";

const Dangerous = dangerous`
  <h1>Who am I?</h1>
  <p>Last Name is "${props => props.lastName}"</p>
  <p>First Name is "${props => props.firstName}"</p>
`;

function App() {
  return (
    <div className="App">
      <Dangerous firstName="Sung" lastName="Kim" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
