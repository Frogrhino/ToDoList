import React, { Component } from "react";
import ToDo from "./ToDo";
import uniqid from "uniqid";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import FileUploader from "./FileUploader";
import { usePapaParse } from "react-papaparse";
import ReactModal from "react-modal";

class ToDoList extends Component {
  state = {
    ToDos: JSON.parse(localStorage.getItem("ToDos")) || [],
    input: "",
    fileType: "",
    uploadBool: false,
    emptyInput: false,
  };

  render() {
    return (
      <div className="top bg-light">
        <ReactModal isOpen={this.state.uploadBool}>
          <FileUploader
            onChangeHandler={this.onChangeHandler}
            changeModal={this.changeModal}
            confirmUpload={this.confirmUpload}
            shouldCloseOnOverlayClick={true}
          />
        </ReactModal>
        <div>
          <h1 className="text-center">To-Do List</h1>

          {/* Form  */}
          <form className="d-flex mb-3 ms-3 me-3" onSubmit={this.addToDo}>
            <label className="d-flex flex-fill">
              <input
                type="text"
                name="toDo"
                className="d-flex flex-fill inputText"
                placeholder="Write new To-Do"
                onChange={(event) =>
                  this.setState({ input: event.target.value })
                }
                value={this.state.input}
              />
            </label>

            <input
              type="submit"
              value="Submit"
              className="d-flex btn btn-primary btnSubmit"
            />
          </form>

          {this.state.emptyInput ? (
            <div className="d-flex justify-content-center m-2 alert alert-danger">
              You have to type something in to create a To Do
            </div>
          ) : null}

          {/* Buttons */}
          <div
            className="btn-group d-flex justify-content-center m-2"
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.removeAllToDo}
            >
              Remove All
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.downloadJSON}
            >
              Export JSON
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.downloadCSV}
            >
              Export CSV
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.changeModal}
            >
              Import
            </button>
          </div>

          {/* List of all the To Dos  */}
          <ul className="list-group list-group-flush">{this.renderList()}</ul>

          {/* Download link for export data  */}
          <a
            style={{ display: "none" }}
            download={this.state.fileType}
            href={this.state.fileDownloadUrl}
            ref={(e) => (this.dofileDownload = e)}
          ></a>
        </div>
      </div>
    );
  }

  renderList = () => {
    if (this.state.ToDos.length !== 0) {
      return this.state.ToDos.map((element, index) => (
        <ToDo
          id={index}
          onDelete={this.removeToDo}
          changeState={this.changeState}
          toDo={element}
          uploadBool={this.state.uploadBool}
        />
      ));
    }
    return (
      <div className="d-flex p-2 emptyToDo">
        <li
          className="list-group-item d-flex flex-fill justify-content-center"
          key={uniqid()}
        >
          There is no To-Do here.
        </li>
      </div>
    );
  };

  addToDo = (event) => {
    event.preventDefault(); //prevent refresh of the page

    if (event.target.elements.toDo.value !== "") {
      const obj = {
        id: uniqid("listel-"),
        value: event.target.elements.toDo.value,
        timeStampCreated: Date.now(),
        timeStampDone: 0,
      };

      this.setState(
        {
          ToDos: [...this.state.ToDos, obj],
          input: "",
          emptyInput: false,
        },
        () => localStorage.setItem("ToDos", JSON.stringify(this.state.ToDos))
      );
    } else this.setState({ emptyInput: true });
  };

  // Remove functions
  removeToDo = (toDoID) => {
    const ToDos = this.state.ToDos.filter((element) => element.id !== toDoID);
    this.setState({ ToDos }, () =>
      localStorage.setItem("ToDos", JSON.stringify(this.state.ToDos))
    );
  };
  removeAllToDo = () => {
    this.setState({ ToDos: [] }, () =>
      localStorage.setItem("ToDos", JSON.stringify(this.state.ToDos))
    );
  };

  // Download functions
  downloadJSON = () => {
    const output = JSON.stringify(this.state.ToDos, null, 4);
    this.downloadFile(output, "states.json");
  };

  downloadCSV = () => {
    const { jsonToCSV } = usePapaParse();
    let json = JSON.stringify(this.state.ToDos, null, 4);
    const output = jsonToCSV(json);
    this.downloadFile(output, "states.csv");
  };

  downloadFile = (str, fileType) => {
    const blob = new Blob([str]);
    const fileDownloadUrl = URL.createObjectURL(blob);
    this.setState({ fileType, fileDownloadUrl: fileDownloadUrl }, () => {
      this.dofileDownload.click();
      URL.revokeObjectURL(fileDownloadUrl); // free up storage--no longer needed.
      this.setState({ fileType: "", fileDownloadUrl: "" });
    });
  };

  // Upload functions
  onChangeHandler = (event) => {
    event.preventDefault();

    const { readString } = usePapaParse();
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = (e) => {
      let output = e.target.result;
      let ToDos = [];
      if (
        file.type === "application/csv" ||
        file.type === "application/vnd.ms-excel"
      ) {
        let tmp = readString(e.target.result);
        output = tmp.data
          .map((element, index) => {
            if (index === 0);
            else {
              return {
                id: element[0],
                value: element[1],
                timeStampCreated: parseInt(element[2]),
                timeStampDone: parseInt(element[3]),
              };
            }
          })
          .filter((element) => element != null);
      } else {
        output = JSON.parse(output);
      }
      console.log(output);

      for (let i = 0; i < output.length; i++) {
        ToDos.push(output[i]);
      }

      this.setState({ tmpToDos: ToDos });
    };

    reader.readAsText(file);
  };

  confirmUpload = () => {
    if (
      typeof this.state.tmpToDos !== "undefined" &&
      this.state.tmpToDos.length > 0
    ) {
      if (
        typeof this.state.ToDos !== "undefined" &&
        this.state.ToDos.length > 0
      )
        this.setState(
          { ToDos: this.state.ToDos.concat(this.state.tmpToDos) },
          () => localStorage.setItem("ToDos", JSON.stringify(this.state.ToDos))
        );
      else
        this.setState({ ToDos: this.state.tmpToDos }, () =>
          localStorage.setItem("ToDos", JSON.stringify(this.state.ToDos))
        );

      this.changeModal();
    } else alert("You didn't select a file to upload!");
  };

  // Other change functions
  changeModal = () => {
    if (this.state.uploadBool) this.setState({ uploadBool: false });
    else this.setState({ uploadBool: true });
  };

  changeState = (selected, toDoID) => {
    let ToDos;

    if (selected) {
      ToDos = this.state.ToDos.map((element) => {
        if (element.id === toDoID) element.timeStampDone = Date.now();
        return element;
      });

      this.setState({ ToDos }, () =>
        localStorage.setItem("ToDos", JSON.stringify(this.state.ToDos))
      );
    } else {
      ToDos = this.state.ToDos.map((element) => {
        if (element.id === toDoID) element.timeStampDone = 0;
        return element;
      });

      this.setState({ ToDos }, () =>
        localStorage.setItem("ToDos", JSON.stringify(this.state.ToDos))
      );
    }
  };
}

export default ToDoList;
