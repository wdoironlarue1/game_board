import React from "react";
import PropTypes from "prop-types";

class MoveHistory extends React.Component {
  static propTypes = {
    moves: PropTypes.array,
  };

  getRowsFromMoves = () => {
    let rows = [];
    for (let i = 0; i < this.props.moves.length; i++) {
      rows.push(
        <tr>
          <td>{this.props.moves[i]}</td>
        </tr>
      );
    }
    return rows;
  };

  render() {
    return (
      <div>
        <table style={{ border: "solid", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <td>
                <p>Move History</p>
              </td>
            </tr>
          </thead>
          <tbody>{this.getRowsFromMoves()}</tbody>
        </table>
      </div>
    );
  }
}

export default MoveHistory;
