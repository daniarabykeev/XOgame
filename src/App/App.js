import React, { Component } from 'react';
import './App.css';

import Header from '../Header/Header';


class App extends Component {

  state = {
    squares: Array(9).fill(null),
    round: true,
    winnerLine: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ],
    gameOver: true,
    gameScore: [
      { shape: 'X', count: 0 },
      { shape: '0', count: 0 }
    ]
  }

  selectFirstMove = (select) => {
    const { gameOver } = this.state;

    if (select === 'X' && gameOver) {
      this.setState({ round: true });
    }
    else if (select === '0' && gameOver) {
      this.setState({ round: false });
    }
  }

  isWinner = () => {
    const { squares, round, winnerLine, gameScore } = this.state;
    const mark = round ? 'X' : '0';
    let fill = squares.filter(item => item);
    const len = squares.length;
    let win = false;
    const empty = squares.filter(item => item);

    // защищает от переключения во время партии игры
    if (empty.length >= 1) {
      this.setState({ gameOver: false });
    }

    for (let i = 0; i < winnerLine.length; i++) {
      if (
        squares[winnerLine[i][0]] === mark &&
        squares[winnerLine[i][1]] === mark &&
        squares[winnerLine[i][2]] === mark
      ) {
        win = true;
        alert('Выиграл: ' + mark);
        this.setNewGame()
        // меняем счет игры
        gameScore.map(item => {
          if (item.shape === mark) {
            item.count++;
          }
          return item;
        });
        this.setState({ gameScore: gameScore });

        return true;
      };
    };

    if (fill.length >= len && !win) {
      this.setState({ gameOver: true });
      alert('Игра окончена. НИЧЬЯ');
      this.setNewGame()
    }
  };

  clickHandler = (event) => {
    const { squares, round } = this.state;
    const id = event.target.getAttribute('data');

    if (!squares[id]) {
      squares[id] = round ? 'X' : '0';
      this.setState({ squares: squares, round: !round });
    };

    this.isWinner();
  };

  setNewGame = () => {
    this.setState({ gameOver: true, squares: Array(9).fill(null) });
  }

  render() {

    const { squares, gameOver, gameScore } = this.state;
    let id = 0;

    return (
      <div className="tic-tac-toe">
        <Header
          selectFirstMove={this.selectFirstMove}
          gameOver={gameOver}
          gameScore={gameScore}
          setNewGame={this.setNewGame}
        />
        <div className="grid">
          {
            squares.map((item) => {
              let classStyle = 'cell';
              if (item === 'X') {
                classStyle += ' bisque';
              } else if (item === '0') {
                classStyle += ' skyblue';
              }
              return (
                <div key={id}
                  className={classStyle}
                  data={id}
                  onClick={this.clickHandler}
                >
                  <span style={{display:"none"}}>

                  {squares[id++]}
                  </span>
                </div>
              )
            })
          }
        </div>

      </div>
    );
  };
};

export default App;
