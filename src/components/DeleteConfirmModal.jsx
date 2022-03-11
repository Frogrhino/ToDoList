import React, { Component } from "react";

class DeleteConfirmModal extends Component {
  state = {};
  render() {
    return (
      <div className="d-flex flex-column align-items-stretch">
        <div className="mb-auto">
          <h3>Do you really want to delete this?</h3>
        </div>
        <div
          className="btn-group justify-content-center"
          role="group"
          aria-label="Basic example"
        >
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => this.props.removeToDo(true)}
          >
            Yes
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => this.props.removeToDo(false)}
          >
            No
          </button>
        </div>
      </div>
    );
  }
}

export default DeleteConfirmModal;
