import React, { Component } from 'react';
import './App.css';

const X = "X";
const O = "Y";

class Square extends Component {
  constructor() {
    super();

    this.state = {
      value : null
    }
  }

  render() {
    return <div className="square">{ this.state.value }</div>
  }
}

class BoardRow extends Component {
  render() {
    return (
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    );
  }
}

class Board extends Component {
  render() {
    return (
      <div className="board">
        <BoardRow />
        <BoardRow />
        <BoardRow />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Board />
    );
  }
}

export default App;
