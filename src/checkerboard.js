/**
 * container for the checker game that holds the checkerboard page including the
 * board itself as well as return button and movement history
 */

import React from "react";
import PropTypes from "prop-types";
import Board from "./board.js";
import "./checkerboard.css";
import { WHITE, BLACK, CHECKER } from "./constants.js";
import GamePiece from "./gamePiece.js";
import MoveHistory from "./moveHistory.js";
import { getPiecePositions, isGameDone } from "./helperFuncs.js";

class Checkerboard extends React.Component {
  static propTypes = {
    handleClickReturnBtn: PropTypes.func,
  };

  updateTurn = (color) => {
    this.setState({ turn: color });
  };

  //maybe move this to a helper file
  getStartingPieces = () => {
    let pieces = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 1) {
          pieces.push(new GamePiece(WHITE, i, j, CHECKER, false));
        }
      }
    }
    for (let i = 5; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 1) {
          pieces.push(new GamePiece(BLACK, i, j, CHECKER, false));
        }
      }
    }
    return pieces;
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
      ? this.getPossibleMoves(piece, pieces)
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

  // can move this to a helper file too
  getPossibleMoves = (piece, pieces) => {
    let moves = [];
    const piecePositions = getPiecePositions(pieces);
    if (piece.color === WHITE || piece.isKing) {
      if (piece.column !== 0) {
        if (!piecePositions[(piece.row + 1) * 8 + piece.column - 1]) {
          moves.push((piece.row + 1) * 8 + piece.column - 1);
        } else if (
          piece.column - 1 !== 0 &&
          piece.row + 1 !== 7 &&
          piecePositions[(piece.row + 1) * 8 + piece.column - 1].color !==
            piece.color &&
          !piecePositions[(piece.row + 2) * 8 + piece.column - 2]
        ) {
          moves.push((piece.row + 2) * 8 + piece.column - 2);
        }
      }
      if (piece.column !== 7) {
        if (!piecePositions[(piece.row + 1) * 8 + piece.column + 1]) {
          moves.push((piece.row + 1) * 8 + piece.column + 1);
        } else if (
          piece.column + 1 !== 7 &&
          piece.row + 1 !== 7 &&
          piecePositions[(piece.row + 1) * 8 + piece.column + 1].color !==
            piece.color &&
          !piecePositions[(piece.row + 2) * 8 + piece.column + 2]
        ) {
          moves.push((piece.row + 2) * 8 + piece.column + 2);
        }
      }
    }
    if (piece.color === BLACK || piece.isKing) {
      if (piece.column !== 0) {
        if (!piecePositions[(piece.row - 1) * 8 + piece.column - 1]) {
          moves.push((piece.row - 1) * 8 + piece.column - 1);
        } else if (
          piece.column - 1 !== 0 &&
          piece.row - 1 !== 0 &&
          piecePositions[(piece.row - 1) * 8 + piece.column - 1].color !==
            piece.color &&
          !piecePositions[(piece.row - 2) * 8 + piece.column - 2]
        ) {
          moves.push((piece.row - 2) * 8 + piece.column - 2);
        }
      }
      if (piece.column !== 7) {
        if (!piecePositions[(piece.row - 1) * 8 + piece.column + 1]) {
          moves.push((piece.row - 1) * 8 + piece.column + 1);
        } else if (
          piece.column + 1 !== 7 &&
          piece.row - 1 !== 0 &&
          piecePositions[(piece.row - 1) * 8 + piece.column + 1].color !==
            piece.color &&
          !piecePositions[(piece.row - 2) * 8 + piece.column + 2]
        ) {
          moves.push((piece.row - 2) * 8 + piece.column + 2);
        }
      }
    }
    return moves;
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
      const possibleMoves = this.getPossibleMoves(selectedPiece, pieces);
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

  state = {
    turn: WHITE,
    moveHistory: [],
    pieces: this.getStartingPieces(),
    possibleMoves: [],
    selectedPiece: {},
    isMultiJumping: false,
    isGameDone: false,
  };
  render() {
    return (
      <div
        style={{
          backgroundColor: "#3b65b9",
          textAlign: "center",
          minHeight: "100vh",
        }}
      >
        {this.state.isGameDone && (
          <div id="modal">
            <div className="modalContent">
              <h2>{this.state.pieces[0].color} won!</h2>
              <button style={{ margin: "5px" }} onClick={this.handleCloseModal}>
                close
              </button>
              <button
                style={{ margin: "5px" }}
                onClick={this.props.handleClickReturnBtn}
              >
                return to start page
              </button>
            </div>
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
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
