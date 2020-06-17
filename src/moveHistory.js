import React from "react";
import PropTypes from "prop-types";
import { WHITE } from "./constants.js";

class MoveHistory extends React.Component {
  static propTypes = {
    moves: PropTypes.array,
    undoMove: PropTypes.func,
  };

  getRowsFromMoves = () => {
    let rows = [];
    for (let i = 0; i < this.props.moves.length; i++) {
      let move = this.props.moves[i];
      rows.push(
        <tr key={i}>
          <td style={{ textAlign: "center", width: "150px" }}>
            <span
              className={
                move.piece.color === WHITE
                  ? "smallWhiteChecker"
                  : "smallBlackChecker"
              }
            />
            {` ${String.fromCharCode(move.piece.column + 65)},${
              8 - move.piece.row
            } ${
              Math.abs(move.piece.row - move.row) > 1 ? "(hop)" : "→"
            } ${String.fromCharCode(move.column + 65)},${8 - move.row} `}
          </td>
        </tr>
      );
    }
    return rows;
  };

  render() {
    return (
      <div>
        <table
          style={{
            border: "solid",
            borderCollapse: "collapse",
            width: "150px",
            backgroundColor: "white",
          }}
        >
          <thead
            style={{
              display: "block",
            }}
          >
            <tr>
              <td style={{ textAlign: "center", width: "150px" }}>
                <p>Move History</p>
              </td>
            </tr>
          </thead>
          <tbody
            style={{ display: "block", height: "375px", overflowY: "auto" }}
          >
            {this.getRowsFromMoves()}
          </tbody>
        </table>
        <button onClick={this.props.undoMove}>undo</button>
      </div>
    );
  }
}

export default MoveHistory;
