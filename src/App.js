import React from "react";
import "./App.css";
import StartPage from "./startPage.js";
import Checkerboard from "./checkerboard.js";

class App extends React.Component {
  state = {
    container: StartPage,
  };

  handleClickCheckersBtn = () => {
    this.setState({
      container: Checkerboard,
    });
  };

  handleClickReturnBtn = () => {
    this.setState({
      container: StartPage,
    });
  };

  handleClickChessBtn = () => {
    this.setState({
      container: Checkerboard,
    });
  };

  render() {
    const Container = this.state.container;
    // console.log(Container === St);
    const Props =
      Container === StartPage
        ? {
            handleClickCheckersBtn: this.handleClickCheckersBtn,
            handleClickChessBtn: this.handleClickChessBtn,
          }
        : { handleClickReturnBtn: this.handleClickReturnBtn };
    return <Container {...Props} />;
  }
}

export default App;
