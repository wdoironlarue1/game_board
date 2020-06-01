import Checker from "./checker.js";
import React from "react";

class GamePiece {
  constructor(color, row, column, type, handleSelect) {
    this.color = color;
    this.row = row;
    this.column = column;
    this.type = type;
    this.handleSelect = handleSelect;
  }

  display = () => {
    return (
      <Checker
        color={this.color}
        row={this.row}
        column={this.column}
        setSelectedPiece={() => this.handleSelect(this)}
      />
    );
  };

  handleMovePiece = (row, column) => {
    this.row = row;
    this.column = column;
  };
}

export default GamePiece;
