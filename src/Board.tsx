import * as React from 'react';

import Square from './Square';
import { SquareValueType } from './Square';

interface IBoardState {
  squares: SquareValueType[];
  xIsNext: boolean;
}

class Board extends React.Component<{}, IBoardState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      squares: Array<SquareValueType>(9).fill(null),
      xIsNext: true,
    };
  }

  public handleClick: (i: number) => void = (i: number) => {
    const tmpSquares: SquareValueType[] = this.state.squares.slice();
    if (calculateWinner(this.state.squares) || this.state.squares[i]) {
      return;
    }
    tmpSquares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: tmpSquares,
      xIsNext: !this.state.xIsNext,
    });
  }

  public createOnClick: (i: number) => () => void = (i: number) => {
    return (() => {
      this.handleClick(i);
    });
  }

  public renderSquare(i: number) {
    const tmpOnClick: () => void = this.createOnClick(i);
    return (
      <Square
        value={this.state.squares[i]}
        onClick={tmpOnClick}
      />
    );
  }

  public render() {
    const winner = calculateWinner(this.state.squares);
    let status;

    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
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

export default Board;

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
