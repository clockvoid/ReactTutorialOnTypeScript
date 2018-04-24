import * as React from 'react';

export type SquareValueType = string | null;

interface ISquareProps {
  value: SquareValueType;
  onClick: () => void;
}

const Square: React.SFC<ISquareProps> = (props: ISquareProps) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
