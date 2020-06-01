/**
 * container for the checker game that holds the checkerboard page including the
 * board itself as well as return button and movement history
 */

import React from "react";
import PropTypes from "prop-types";
import Board from "./board.js";
import "./checkerboard.css";
import GamePiece from "./gamePiece.js";

class Checkerboard extends React.Component {
  static propTypes = {
    handleClickReturnBtn: PropTypes.func,
  };

  getStartingPieces = () => {
    let pieces = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 1) {
          pieces.push(
            new GamePiece("white", i, j, "checker", this.setSelectedPiece)
          );
        }
      }
    }
    for (let i = 5; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 1) {
          pieces.push(
            new GamePiece("black", i, j, "checker", this.setSelectedPiece)
          );
        }
      }
    }
    return pieces;
  };

  handleSelectChecker = (e) => {
    // console.log(e.target);
  };

  setSelectedPiece = (piece) => {
    this.setState({ selectedPiece: piece });
    piece.handleMovePiece(3, 1);
    this.forceUpdate();
  };

  state = {
    pieces: this.getStartingPieces(),
    selectedPiece: {},
  };

  render() {
    return (
      <div>
        <Board
          pieces={this.state.pieces}
          selectedPiece={this.state.selectedPiece}
        ></Board>
        <button onClick={this.props.handleClickReturnBtn}>
          Go Back to Start Page
        </button>
      </div>
    );
  }
}

export default Checkerboard;
