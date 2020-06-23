import React from "react";
import "./startPage.css";
import PropTypes from "prop-types";

const GITHUB_LINK = "https://github.com/wdoironlarue1/game_board";

class StartPage extends React.Component {
  static propTypes = {
    handleClickCheckersBtn: PropTypes.func,
    handleClickChessBtn: PropTypes.func,
  };

  render() {
    return (
      <div className="StartPage">
        <img
          id="topCheckerboard"
          width="200"
          height="200"
          src={require("./checkerboard.png")}
          alt="Woo!"
        />
        <a href={GITHUB_LINK} style={{ color: "black" }} target="_blank">
          check out the source code here
        </a>
        <div>
          <h1>Choose what game you'd like to play</h1>
          <div id="Buttons">
            <button
              onClick={this.props.handleClickChessBtn}
              style={{ fontSize: "30px" }}
              disabled={true}
            >
              chess
            </button>
            <button
              onClick={this.props.handleClickCheckersBtn}
              style={{ fontSize: "30px" }}
            >
              checkers
            </button>
          </div>
        </div>
        <img
          id="bottomCheckerboard"
          width="200"
          height="200"
          src={require("./checkerboard.png")}
          alt="Woo!"
        />
      </div>
    );
  }
}

export default StartPage;
