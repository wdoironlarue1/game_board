import React from "react";
import "./board.css";
import PropTypes from "prop-types";
import { getPiecePositions, isGameDone } from "./helperFuncs.js";
import { WHITE, BLACK } from "./constants.js";
import Checker from "./checker";

class Board extends React.Component {
  static propTypes = {
    isCorrectTurn: PropTypes.func,
    updateTurn: PropTypes.func,
    startingPieces: PropTypes.array,
    returnToHomePage: PropTypes.func,
    addToMoveHistory: PropTypes.func,
  };

  state = {
    pieces: this.props.startingPieces,
    possibleMoves: [],
    selectedPiece: {},
    isMultiJumping: false,
    isGameDone: false,
  };

  setSelectedPiece = (piece) => {
    if (this.state.isMultiJumping || !this.props.isCorrectTurn(piece)) {
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

  getBoard = () => {
    let rows = [];
    let piecePositions = getPiecePositions(this.state.pieces);

    for (let i = 0; i < 8; i++) {
      let cells = [];
      for (let j = 0; j < 8; j++) {
        const possibleMoveSpace = this.state.possibleMoves.includes(i * 8 + j);
        cells.push(
          <td
            key={i * 8 + j}
            className={
              ((i + j) % 2 === 0 ? "whiteSpace" : "blackSpace") +
              (possibleMoveSpace ? " possible" : "")
            }
            onClick={
              possibleMoveSpace ? () => this.moveSelectedPiece(i, j) : () => {}
            }
          >
            {piecePositions[i * 8 + j]
              ? this.displayPiece(piecePositions[i * 8 + j])
              : ""}
          </td>
        );
      }
      rows.push(
        <tr key={i}>
          <td>{8 - i}</td>
          {cells}
          <td>{8 - i}</td>
        </tr>
      );
    }
    return rows;
  };

  displayPiece = (piece) => {
    return (
      <Checker
        color={piece.color}
        row={piece.row}
        column={piece.column}
        setSelectedPiece={() => {
          this.setSelectedPiece(piece);
        }}
        isSelected={piece.isSelected}
        isKing={piece.isKing}
      />
    );
  };

  moveSelectedPiece = (row, column) => {
    let pieces = [...this.state.pieces],
      selectedPiece = {},
      shouldUpdateTurn = true,
      nextPossibleMoves = [];
    const isCaptureMove = Math.abs(this.state.selectedPiece.row - row) > 1;
    this.props.addToMoveHistory(this.state.setSelectedPiece, row, column);

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
      this.props.updateTurn();
    }
  };

  handleCloseModal = () => {
    this.setState({ isGameDone: false });
  };

  getColumnLetters = () => {
    let cells = [];
    cells.push(<td key={-1}></td>);
    for (let i = 0; i < 8; i++) {
      cells.push(<td key={i}>{String.fromCharCode(i + 65)}</td>);
    }
    return cells;
  };

  render() {
    return (
      <div className="board">
        {this.state.isGameDone && (
          <div id="modal">
            <div className="modalContent">
              <h2>{this.state.pieces[0].color} won!</h2>
              <button style={{ margin: "5px" }} onClick={this.handleCloseModal}>
                close
              </button>
              <button
                style={{ margin: "5px" }}
                onClick={this.props.returnToHomePage}
              >
                return to start page
              </button>
            </div>
          </div>
        )}
        <table style={{ borderCollapse: "collapse" }}>
          <tbody>
            <tr>{this.getColumnLetters()}</tr>
            {this.getBoard()}
            <tr>{this.getColumnLetters()}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
