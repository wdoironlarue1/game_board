import React from "react";
import PropTypes from "prop-types";

class Checker extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    row: PropTypes.number,
    column: PropTypes.number,
    setSelectedPiece: PropTypes.func,
  };
  state = {
    row: this.props.row,
    column: this.props.column,
  };

  handleSelectChecker = (e) => {
    this.props.setSelectedPiece(this);
  };

  handleMoveChecker = (row, column) => {
    this.setState({ row, column });
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <span
          onClick={(e) => this.handleSelectChecker(e)}
          id={this.props.color === "white" ? "whiteChecker" : "blackChecker"}
        ></span>
      </div>
    );
  }
}

export default Checker;
