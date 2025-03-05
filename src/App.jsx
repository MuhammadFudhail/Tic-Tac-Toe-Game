import { useState } from 'react'

function Square({ value, onSquaresClick }) {
  
  return (
    <button className='square' onClick={onSquaresClick}>

      {value}

    </button>
  );
}


 function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares))
      return;

    const nextSquares = squares.slice();
    // if(xIsNext){
    //   nextSquares[i] = 'X'
    // }else{
    //   nextSquares[i] = 'O';
    // }

    nextSquares[i] = xIsNext ? 'X' : 'O'  //ternary
    // setSquares(nextSquares)
    // setXIsNext(!xIsNext);
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares)
  let status = '';

  if (winner) {
    status = 'winner: ' + winner;
  }else {
    status = 'next player: ' + (xIsNext ? 'X' : 'O')
  }


  return (
    <>
    <div className='status'> {status }</div>
    <div className='board'>
      <Square value={squares[0]} onSquaresClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquaresClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquaresClick={() => handleClick(2)}/>
      <Square value={squares[3]} onSquaresClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquaresClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquaresClick={() => handleClick(5)}/>
      <Square value={squares[6]} onSquaresClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquaresClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquaresClick={() => handleClick(8)}/>
    </div>
    </>
  )
}

export default function Game() {
  // const [xIsNext, setXIsNext] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [curretMove, setCurrentMove] = useState(0)
  const currenSquares = history[curretMove];
  const xIsNext = curretMove % 2 === 0;

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // setXIsNext(nextMove % 2 === 0);
  }

  function handlePlay(nextSquares) {
    // setHistory([...history, nextSquares])
    const nextHistory = [...history.slice(0, curretMove + 1), nextSquares];
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length -1)
    // setXIsNext(!xIsNext);
  }

  const moves = history.map((squares, move) => {
    let description = '';
    if(move > 0) {
      description = 'Go to move #' + move
    }else {
      description = 'Go to game start';
    }

    return(
      <li key={move}>
        <button onClick={()=> jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className='game'>
      <div className='game-board'>
        <Board  xIsNext={xIsNext} squares={currenSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if(squares[a] && squares[a] === squares[b] && squares[c]) {
      return squares[a];
    }

  }
  return false;
}
 
