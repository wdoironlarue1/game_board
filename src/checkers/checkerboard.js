/**
 * container for the checker game that holds the checkerboard page including the
 * board itself as well as return button and movement history
 */

import React from "react";
import PropTypes from "prop-types";
import Board from "../board.js";
import "./checkerboard.css";
import { WHITE, BLACK, CHECKER } from "../constants.js";
import GamePiece from "../gamePiece.js";
import MoveHistory from "../moveHistory.js";
import {
  isGameDone,
  getStartingPieces,
  getPossibleMoves,
} from "../helperFuncs.js";
import Modal from "../modal.js";

class Checkerboard extends React.Component {
  static propTypes = {
    handleClickReturnBtn: PropTypes.func,
  };
  state = {
    turn: WHITE,
    moveHistory: [],
    pieces: getStartingPieces(),
    possibleMoves: [],
    selectedPiece: {},
    isMultiJumping: false,
    isGameDone: false,
  };

  updateTurn = (color) => {
    this.setState({ turn: color });
  };

  setSelectedPiece = (piece) => {
    if (this.state.isMultiJumping || !(piece.color === this.state.turn)) {
      return;
    }
    let pieces = [...this.state.pieces];
    const selectedIndex = pieces.findIndex((p) => p === piece);
    const prevSelectedIndex = pieces.findIndex((p) => p.isSelected);
    pieces[selectedIndex].isSelected = !piece.isSelected;
    if (prevSelectedIndex !== -1) {
      pieces[prevSelectedIndex].isSelected = false;
    }
    const possibleMoves = piece.isSelected
      ? getPossibleMoves(piece, pieces)
      : [];
    this.setState({
      selectedPiece: { ...piece, isSelected: !piece.isSelected },
      pieces,
      possibleMoves,
    });
  };

  addToMoveHistory = (piece, row, column) => {
    this.setState((prevState) => ({
      moveHistory: [...prevState.moveHistory, { piece, row, column }],
    }));
  };

  moveSelectedPiece = (row, column) => {
    let pieces = [...this.state.pieces],
      selectedPiece = {},
      shouldUpdateTurn = true,
      nextPossibleMoves = [];
    const isCaptureMove = Math.abs(this.state.selectedPiece.row - row) > 1;
    this.addToMoveHistory(this.state.selectedPiece, row, column);

    for (let i = 0; i < pieces.length; i++) {
      if (pieces[i].isSelected) {
        pieces[i].row = row;
        pieces[i].column = column;
        selectedPiece = pieces[i];
      }

      if (
        isCaptureMove &&
        pieces[i].row === (row + this.state.selectedPiece.row) / 2 &&
        pieces[i].column === (column + this.state.selectedPiece.column) / 2
      ) {
        pieces.splice(i, 1);
        i--;
      }
    }

    if (isCaptureMove && !([0, 7].includes(row) && !selectedPiece.isKing)) {
      const possibleMoves = getPossibleMoves(selectedPiece, pieces);
      for (let j = 0; j < possibleMoves.length; j++) {
        if (Math.abs(column - (possibleMoves[j] % 8)) > 1) {
          shouldUpdateTurn = false;
          nextPossibleMoves.push(possibleMoves[j]);
        }
      }
    }

    if (
      (selectedPiece.color === BLACK && row === 0) ||
      (selectedPiece.color === WHITE && row === 7)
    ) {
      selectedPiece.isKing = true;
    }
    selectedPiece.isSelected = !shouldUpdateTurn;

    this.setState({
      selectedPiece: shouldUpdateTurn ? {} : { ...selectedPiece },
      pieces,
      possibleMoves: nextPossibleMoves,
      isMultiJumping: !shouldUpdateTurn,
      isGameDone: isGameDone(pieces),
    });
    if (shouldUpdateTurn) {
      this.updateTurn(selectedPiece.color === WHITE ? BLACK : WHITE);
    }
  };

  handleCloseModal = () => {
    this.setState({ isGameDone: false });
  };

  undoMove = () => {
    let moveHist = [...this.state.moveHistory];
    let lastMove = moveHist.pop();
    if (!lastMove) {
      return;
    }
    const isCaptureMove = Math.abs(lastMove.column - lastMove.piece.column) > 1;
    let pieces = [...this.state.pieces];
    const movedPiece = pieces.find(
      (piece) => piece.column === lastMove.column && piece.row === lastMove.row
    );
    if (movedPiece.isKing && !lastMove.piece.isKing) {
      movedPiece.isKing = false;
    }
    if (isCaptureMove) {
      pieces.push(
        new GamePiece(
          movedPiece.color === WHITE ? BLACK : WHITE,
          (movedPiece.row + lastMove.piece.row) / 2,
          (movedPiece.column + lastMove.piece.column) / 2,
          CHECKER,
          false
        )
      );
    }

    movedPiece.column = lastMove.piece.column;
    movedPiece.row = lastMove.piece.row;
    this.updateTurn(movedPiece.color);
    this.setState({ moveHistory: moveHist, pieces });
  };

  render() {
    return (
      <div id="checkers">
        {this.state.isGameDone && (
          <Modal
            handleCloseModal={this.handleCloseModal}
            handleClickReturnBtn={this.props.handleClickReturnBtn}
          />
        )}
        <div id="checkers-board">
          <p>turn:</p> <div className={this.state.turn + "Square"} />
          <Board
            pieces={this.state.pieces}
            setSelectedPiece={this.setSelectedPiece}
            moveSelectedPiece={this.moveSelectedPiece}
            possibleMoves={this.state.possibleMoves}
          />
          <MoveHistory
            undoMove={this.undoMove}
            moves={this.state.moveHistory}
          ></MoveHistory>
        </div>
        <button onClick={this.props.handleClickReturnBtn}>
          Go Back to Start Page
        </button>
      </div>
    );
  }
}

export default Checkerboard;
