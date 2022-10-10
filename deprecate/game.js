/*import React from 'react';
import ReactDOM from 'react-dom/client';
*/
// import './index.css';

/*
class Square extends React.Component {

  render() {
    return (
      <button 
        className="square" 
        onClick={() => this.props.onClick() }
      >
        {this.props.value}
      </button>
    );
  }
}
*/

function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}
        >{props.value}
        </button>
    );
}

function calculateWinner(squares) {
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
    for(let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i];
        if(squares[a] === squares[b] &&
        squares[c] === squares[b] &&
        squares[a] === squares[c]) return squares[a];
    }
    return null;
}

class Board extends React.Component {


    renderSquare(i) {
        return <Square 
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />;
    }

  render() {

    return (
      <div>
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
    );
  }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history:[{
                squares:Array(9).fill(null),
            }],
            xturn: true,
            step_num:0,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.step_num + 1);
        const squares = history[history.length - 1].squares.slice();
        if (squares[i] || calculateWinner(squares))
            return;
            this.setState({xturn: !this.state.xturn});
            squares[i] = this.state.xturn ? 'X' : 'O';
            this.setState(
                {
                    history: history.concat([{squares:squares}]),
                    step_num: history.length,
                    xturn: !this.state.xturn,
                }
            );
    }

    jumpTo(step) {
        this.setState({
            step_num: step,
            xturn: (step % 2) === 0,
        });
    }

  render() {
    const history = this.state.history;
    const current = history[this.state.step_num];
    const winner = calculateWinner(current.squares);

    

    let status;
    if(winner != null) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next Shit: ' + (this.state.xturn ? 'X' : 'O');
    }

      const moves = history.map((step, move)=>{
          const desc = move ? 'Go to move #' + move :
              'Go to game start';
          return (
              <li key={move}>
              <button onClick={()=>this.jumpTo(move)}>{desc}</button>
              </li>
          );
          });

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i)=>this.handleClick(i)}
        />
        </div>
        <div className="game-info">
            <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(
    document.getElementById("playground"));
root.render(<Game />);
