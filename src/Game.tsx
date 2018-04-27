import * as React from 'react';
import './Game.css';

import Board from './Board';
import { SquareValueType } from './Square';

interface IHistory {
  squares: SquareValueType[];
}

interface IGameState {
  history: IHistory[];
  xIsNext: boolean;
  stepNumber: number;
}

class Game extends React.Component<{}, IGameState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  public handleClick: (i: number) => void = (i: number) => {
    const history: IHistory[] = this.state.history.slice(0, this.state.stepNumber + 1);
    const current: IHistory = history[history.length - 1];
    const squares: SquareValueType[] = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  public createOnClick: (i: number) => () => void = (i: number) => {
    return (() => {
      this.handleClick(i);
    });
  }

  public jumpTo: (step: number) => void = (step: number) => {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  public render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
      const clickmove = () => this.jumpTo(move);
      const desc = move ? 
        'Go to move # ' + move : 
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={clickmove}>{desc}</button>
        </li>
      );
    });

    const onclick: (i: number) => void = (i) => this.handleClick(i);

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={onclick}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;

function calculateWinner(squares: SquareValueType[]) {
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
  let value:SquareValueType = null;
  lines.forEach((item) => {
    const [a, b, c] = item;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      value = squares[a];
    }
  });
  return value;
}

