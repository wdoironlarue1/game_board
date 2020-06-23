import React from "react";
import PropTypes from "prop-types";

class Modal extends React.Component {
  static propTypes = {
    handleCloseModal: PropTypes.func,
    handleClickReturnBtn: PropTypes.func,
  };

  render() {
    return (
      <div id="modal">
        <div className="modalContent">
          <h2>{this.state.pieces[0].color} won!</h2>
          <button
            style={{ margin: "5px" }}
            onClick={this.props.handleCloseModal}
          >
            close
          </button>
          <button
            style={{ margin: "5px" }}
            onClick={this.props.handleClickReturnBtn}
          >
            return to start page
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;
