import React from "react";
import "./board.css";
import PropTypes from "prop-types";
import { getPiecePositions } from "./helperFuncs.js";
import Checker from "./checkers/checker";

class Board extends React.Component {
  static propTypes = {
    pieces: PropTypes.array,
    possibleMoves: PropTypes.array,
    moveSelectedPiece: PropTypes.func,
    setSelectedPiece: PropTypes.func,
  };

  getBoard = () => {
    let rows = [];
    let piecePositions = getPiecePositions(this.props.pieces);

    for (let i = 0; i < 8; i++) {
      let cells = [];
      for (let j = 0; j < 8; j++) {
        const possibleMoveSpace = this.props.possibleMoves.includes(i * 8 + j);
        cells.push(
          <td
            key={i * 8 + j}
            className={
              ((i + j) % 2 === 0 ? "whiteSpace" : "blackSpace") +
              (possibleMoveSpace ? " possible" : "")
            }
            onClick={
              possibleMoveSpace
                ? () => this.props.moveSelectedPiece(i, j)
                : () => {}
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
          this.props.setSelectedPiece(piece);
        }}
        isSelected={piece.isSelected}
        isKing={piece.isKing}
      />
    );
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
