class GamePiece {
  constructor(color, row, column, type, isSelected) {
    this.color = color;
    this.row = row;
    this.column = column;
    this.type = type;
    this.isSelected = isSelected;
  }
}

export default GamePiece;
