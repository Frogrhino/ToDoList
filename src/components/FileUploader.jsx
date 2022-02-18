import React, { Component } from "react";

class FileUploader extends Component {
  state = {};

  render() {
    return (
      <div className="d-flex flex-column">
        <div className="modal-content d-flex modalContent">
          <h5 className="modal-header">
            Input your CSV or JSON file{" "}
            <button
              onClick={this.props.changeModal}
              type="button"
              className="btn-close m-2"
              aria-label="Close"
            />
          </h5>
          <input
            type="file"
            name="file"
            onChange={this.props.onChangeHandler}
            className="modal-body"
          />
          <button
            className="btn-primary btnRadius p-2 mt-4"
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
