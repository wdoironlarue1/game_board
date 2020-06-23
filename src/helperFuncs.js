import { WHITE, BLACK, CHECKER } from "./constants.js";
import GamePiece from "./gamePiece.js";

// maps pieces to their location on the board
export const getPiecePositions = (pieces) => {
  let piecePositions = [];
  for (let i = 0; i < pieces.length; i++) {
    let piece = pieces[i];
    piecePositions[piece.row * 8 + piece.column] = piece;
  }
  return piecePositions;
};

export const isGameDone = (pieces) => {
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

export const getStartingPieces = () => {
  let pieces = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 8; j++) {
      if ((i + j) % 2 === 1) {
        pieces.push(new GamePiece(WHITE, i, j, CHECKER, false));
      }
    }
  }
  for (let i = 5; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if ((i + j) % 2 === 1) {
        pieces.push(new GamePiece(BLACK, i, j, CHECKER, false));
      }
    }
  }
  return pieces;
};

export const getPossibleMoves = (piece, pieces) => {
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
