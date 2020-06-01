import React from "react";
import "./board.css";
import PropTypes from "prop-types";

class Board extends React.Component {
  static propTypes = {
    pieces: PropTypes.arrayOf(PropTypes.object),
    selectedPiece: PropTypes.object,
  };

  //we might not need to keep state in this component
  state = {
    pieces: this.props.pieces,
  };

  getBoard = () => {
    let rows = [];
    let piecePositions = this.getPiecePositions();
    for (let i = 0; i < 8; i++) {
      let cells = [];
      for (let j = 0; j < 8; j++) {
        cells.push(
          <td
            key={i * 8 + j}
            className={(i + j) % 2 === 0 ? "whiteSpace" : "blackSpace"}
          >
            {piecePositions[i * 8 + j]
              ? piecePositions[i * 8 + j].display()
              : ""}
          </td>
        );
      }
      rows.push(<tr key={i}>{cells}</tr>);
    }
    return rows;
  };

  getPiecePositions = () => {
    let piecePositions = [];
    for (let x = 0; x < this.state.pieces.length; x++) {
      let piece = this.state.pieces[x];
      piecePositions[piece.row * 8 + piece.column] = piece;
    }
    return piecePositions;
  };

  render() {
    return (
      <div className="board">
        <table style={{ borderCollapse: "collapse", borderStyle: "solid" }}>
          <tbody>{this.getBoard()}</tbody>
        </table>
      </div>
    );
  }
}

export default Board;
