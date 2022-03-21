import React, { Component } from "react";

class FunctionButtons extends Component {
  state = {};
  render() {
    return (
      <div className="d-flex flex-row">
        <input
          type="checkbox"
          className="m-2 bg-secondary"
          hidden={this.props.selection}
          onChange={this.props.toggleAllCheckbox}
          checked={this.props.checkedAll}
        ></input>
        <div
          className="btn-group d-flex justify-content-center m-2 flex-fill"
          role="group"
          aria-label="Basic example"
        >
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.props.changeStateSelect}
          >
            {this.props.selection ? "Show Select" : "Hide Select"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => this.props.removeAlert(null)}
            hidden={this.props.selection}
          >
            Delete Selected
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.props.downloadJSON}
          >
            Export JSON
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.props.downloadCSV}
          >
            Export CSV
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.props.changeModal}
          >
            Import
          </button>
        </div>

        {/* Download link for export data  */}
        <a
          style={{ display: "none" }}
          download={this.state.fileType}
          href={this.state.fileDownloadUrl}
          ref={(e) => (this.dofileDownload = e)}
        ></a>
      </div>
    );
  }
}

export default FunctionButtons;
