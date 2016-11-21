import React, { Component } from 'react';
import './App.css';

const X = "X";
const O = "O";

class Square extends Component {
  render() {
    return <div className="square" onClick={ () => this.props.onClick() }><p>{ this.props.value }</p></div>
  }
}

class Info extends Component {
  render() {
    let items = this.props.histroy.map(x => <div><a href="#">{x.nextState === X ? O : X}</a></div>)
    return (
      <div className="info">
        {items}
      </div>
    )
  }
}

class Board extends Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      nextState: X,
      histroy: []
    }

    this.onClick = this.onClick.bind(this)
  }

  renderSquare(i) {
    return <Square onClick={() => this.onClick(i)} value={this.state.squares[i]} />
  }

  onClick(i) {
    this.setState((prevState) => {
      let newState = prevState;

      if(newState.squares[i] === null) {
        newState.squares[i] = prevState.nextState
        newState.histroy.push(newState)
      }

      newState.nextState = newState.nextState === X ? O : X

      return newState
    })
  }

  render() {
    return (
      <div>
        <div className="board">
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>

        <Info histroy={this.state.histroy}/>
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
