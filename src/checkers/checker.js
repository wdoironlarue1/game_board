import React from "react";
import PropTypes from "prop-types";
import "./checker.css";

class Checker extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    row: PropTypes.number,
    column: PropTypes.number,
    setSelectedPiece: PropTypes.func,
    isSelected: PropTypes.bool,
    isKing: PropTypes.bool,
  };

  handleSelectChecker = () => {
    this.props.setSelectedPiece(this);
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <span
          onClick={this.handleSelectChecker}
          className={
            (this.props.color === "white" ? "white checker" : "black checker") +
            (this.props.isSelected ? " selected" : "") +
            (this.props.isKing ? " king" : "")
          }
        >
          {this.props.isKing && (
            <div className="king">
              <i className="fas fa-crown"></i>
            </div>
          )}
        </span>
      </div>
    );
  }
}

export default Checker;
