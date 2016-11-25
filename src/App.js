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
    var i = 0;
    let items = this.props.histroy.map(x => {
      let t = i
      const tmp = <li><a onClick={() => this.props.onClick(t)} href="#">Move #{i + 1}: {x.nextState === X ? O : X}</a></li>
      i++
      return tmp
    })
    return (
      <div className="info">
        <ol>
          {items}
        </ol>
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
    this.onHistoryClick = this.onHistoryClick.bind(this)
  }

  declaringWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (this.state.squares[a] && this.state.squares[a] === this.state.squares[b] && this.state.squares[a] === this.state.squares[c]) {
        return <div><p>Winner: {this.state.squares[a]}</p></div>
      }
    }
    return null;
    }

  renderSquare(i) {
    return <Square onClick={() => this.onClick(i)} value={this.state.squares[i]} />
  }

  onClick(i) {
    this.setState((prevState) => {
      let newState = prevState;

      if(newState.squares[i] === null) {
        newState.squares = prevState.squares.slice()
        newState.squares[i] = prevState.nextState
        newState.nextState = newState.nextState === X ? O : X
        
        newState.histroy.push(newState)
      }

      return newState
    })
  }

  onHistoryClick(i) {
    this.setState((prevState) => {
      let newState = prevState
      newState.histroy = prevState.histroy.slice(0, i + 1)
      newState.squares = prevState.histroy.slice(-1).pop().squares.slice()
      newState.nextState = prevState.histroy.slice(-1).pop().nextState
      
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

        <Info histroy={this.state.histroy} onClick={this.onHistoryClick}/>
        
        <div>
          <p>Next Player: {this.state.nextState}</p>
          {this.declaringWinner()}
        </div>
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
