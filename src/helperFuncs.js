import { WHITE } from "./constants.js";

// maps pieces to their location on the board
export const getPiecePositions = (pieces) => {
  let piecePositions = [];
  for (let i = 0; i < pieces.length; i++) {
    let piece = pieces[i];
    piecePositions[piece.row * 8 + piece.column] = piece;
  }
  return piecePositions;
};

export const isGameDone = (pieces, game) => {
  let isBlackPiece,
    isWhitePiece = false;
  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i].color === WHITE) {
      isWhitePiece = true;
    } else {
      isBlackPiece = true;
    }
  }
  return !(isBlackPiece && isWhitePiece);
};
