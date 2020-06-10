/**
 * container for the checker game that holds the checkerboard page including the
 * board itself as well as return button and movement history
 */

import React from "react";
import PropTypes from "prop-types";
import Board from "./board.js";
import "./checkerboard.css";
import { WHITE, BLACK } from "./constants.js";
import GamePiece from "./gamePiece.js";
import MoveHistory from "./moveHistory.js";

class Checkerboard extends React.Component {
  static propTypes = {
    handleClickReturnBtn: PropTypes.func,
  };
  state = {
    turn: WHITE,
    moveHistory: [],
  };

  isCorrectTurn = (piece) => {
    return piece.color === this.state.turn;
  };

  updateTurn = () => {
    this.setState((prevState) => ({
      turn: prevState.turn === WHITE ? BLACK : WHITE,
    }));
  };

  getStartingPieces = () => {
    let pieces = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 1) {
          pieces.push(new GamePiece(WHITE, i, j, "checker", false));
        }
      }
    }
    for (let i = 5; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 1) {
          pieces.push(new GamePiece(BLACK, i, j, "checker", false));
        }
      }
    }
    return pieces;
  };

  addToMoveHistory = (piece, row, column) => {
    this.setState((prevState) => ({
      moveHistory: [...prevState.moveHistory, piece],
    }));
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          turn: <div className={this.state.turn + "Square"} />
          <Board
            isCorrectTurn={this.isCorrectTurn}
            updateTurn={this.updateTurn}
            startingPieces={this.getStartingPieces()}
            returnToHomePage={this.props.handleClickReturnBtn}
            addToMoveHistory={this.addToMoveHistory}
          />
          <MoveHistory moves={["hey"]}></MoveHistory>
        </div>
        <button onClick={this.props.handleClickReturnBtn}>
          Go Back to Start Page
        </button>
      </div>
    );
  }
}

export default Checkerboard;
