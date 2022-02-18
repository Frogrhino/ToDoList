import React, { Component } from "react";

class FileUploader extends Component {
  state = {};

  render() {
    return (
      <div className="d-flex flex-column">
        <button
          onClick={this.props.changeModal}
          type="button"
          className="btn-close m-2"
          aria-label="Close"
        />
        <div className="modal-content p-2 d-flex justify-content-center">
          <h5 className="modal-header">Input your CSV or JSON file</h5>
          <input
            type="file"
            name="file"
            onChange={this.props.onChangeHandler}
            className="modal-body"
          />
          <button
            className="btn-primary btnRadius"
            onClick={this.props.confirmUpload}
          >
            Upload
          </button>
        </div>
      </div>
    );
  }
}

export default FileUploader;
