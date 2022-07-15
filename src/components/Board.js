import React from 'react';
import Square from './Square';
import '../styles/Board.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      undo:Array(8).fill(Array(9).fill(9)),
      squares: Array(9).fill(null),
      xIsNext: true,
      xwins:0,
      owins:0
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    var undo = this.state.undo.slice()
    undo.push(this.state.squares);
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? '❌' : '⭕';
    this.setState({undo:undo, squares: squares, xIsNext:!this.state.xIsNext});
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]}         
    onClick={() => this.handleClick(i)}    />;
  }

  render(){
    const winner = calculateWinner(this.state.squares);
    if (winner ===  '❌') {
      this.setState({xwins:this.state.xwins+1,squares: Array(9).fill(null), xIsNext:true});
    } else if (winner === '⭕') {
      this.setState({owins:this.state.owins+1,squares: Array(9).fill(null), xIsNext:true});
    }

    var reset = true
    this.state.squares.map((square) =>{
      if(square === null){
        reset = false
      }
    });

    if (reset){
      this.setState({squares: Array(9).fill(null), xIsNext:true});
    }

    const turn = this.state.xIsNext ? '❌' : '⭕';
  
    return(
      <div className='board'>
        
        <div className='score-board'>
          <span className='xWins'>{this.state.xwins} ❌</span>
          <span className="turn">{turn} Turn</span>
          <span className='oWins'>⭕ {this.state.owins}</span>
        </div>

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
          <button className='btn' id='btn-clear' onClick={() => {this.setState({squares: Array(9).fill(null), xIsNext:true});}}>Clear Board</button>
          <button className='btn' id='btn-undo' onClick={() => {this.setState({squares: this.state.undo.pop(), xIsNext:!this.state.xIsNext});}}>Undo</button>

      </div>
    );
  }
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
