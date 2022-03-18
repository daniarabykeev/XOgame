import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

  state = {
    buttons: [
      { label: 'X', classStyle: 'active', id: 'X' },
      { label: '0', classStyle: '', id: '0' }
    ]
  }

  render() {

    const { buttons } = this.state;
    const { selectFirstMove, gameOver, setNewGame, gameScore } = this.props;

    const selectMove = (event) => {
      if (!gameOver) return false;

      const select = event.target.getAttribute('data');
      const { buttons } = this.state;

      buttons.map(item => {
        return (
          item.classStyle = item.id === select ? 'active' : ''
        )
      });
      this.setState({ buttons: buttons });

      selectFirstMove(select);
    }

    return (
      <div className='header__main'>
        <div className="header">

          <div className="game-score">
            <span>Score board</span>
            <ul className="list-score">
              <li><span>{gameScore[0].shape} -</span>{gameScore[0].count}</li>
              <li><span>{gameScore[1].shape} -</span>{gameScore[1].count}</li>
            </ul>
          </div>

          <div className="btn-new-game">
            <button
              onClick={setNewGame}
            >New game</button>
          </div>
        </div>
      </div>
    );
  };
};

export default Header;