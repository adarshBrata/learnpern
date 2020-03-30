import React, { Fragment } from 'react';
import './App.css';
import InputTodo from "./Components/inputTodo";
import ListTodo from "./Components/listTodo";

function App() {
  return (
      <Fragment>
          <div className="container">
              <InputTodo />
              <ListTodo />
          </div>
      </Fragment>
  );
}

export default App;
