import * as React from 'react';

import Square from './Square';
import { SquareValueType } from './Square';

interface IBoardProps {
  squares: SquareValueType[];
  onClick: (i: number) => void;
}

class Board extends React.Component<IBoardProps, {}> {
  public constructor(props: IBoardProps) {
    super(props);
  }

  public createOnClick: (i: number) => () => void = (i: number) => {
    return (() => {
      this.props.onClick(i);
    });
  }

  public renderSquare(i: number) {
    const tmpOnClick: () => void = this.createOnClick(i);
    return (
      <Square
        value={this.props.squares[i]}
        onClick={tmpOnClick}
      />
    );
  }

  public render() {
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

export default Board;

