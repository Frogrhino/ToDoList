import React, { Component } from "react";
import ToDo from "./ToDo";
import uniqid from "uniqid";
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
    removeToDoID: null,
    removeConfirm: false,
    removeAlertConfirm: false,
    selectedToDos: [],
    selection: true,
    checkedAll: false,
  };

  render() {
    return (
      <div className="top bg-light">
        {/* Modals */}
        <ReactModal
          isOpen={this.state.uploadBool}
          shouldCloseOnOverlayClick={true}
          style={{
            content: {
              top: "35%",
              left: "35%",
              right: "35%",
              bottom: "35%",
              height: "265px",
              width: "410px",
            },
          }}
        >
          <FileUploader
            onChangeHandler={this.onChangeHandler}
            changeModal={this.changeModal}
            confirmUpload={this.confirmUpload}
          />
        </ReactModal>
        <ReactModal
          isOpen={this.state.removeAlertConfirm}
          style={{
            content: {
              top: "35%",
              left: "35%",
              right: "35%",
              bottom: "35%",
              height: "160px",
              width: "410px",
            },
          }}
        >
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
                onClick={() => this.removeToDo(true)}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => this.removeToDo(false)}
              >
                No
              </button>
            </div>
          </div>
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
              You have to type something into the textarea to create a To Do!
            </div>
          ) : null}

          {/* Buttons */}
          <div className="d-flex flex-row">
            <input
              type="checkbox"
              className="m-2 bg-secondary"
              hidden={this.state.selection}
              onChange={this.toggleAllCheckbox}
              checked={this.state.checkedAll}
            ></input>
            <div
              className="btn-group d-flex justify-content-center m-2 flex-fill"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.changeStateSelect}
              >
                {this.state.selection ? "Show Select" : "Hide Select"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => this.removeAlert(null)}
                hidden={this.state.selection}
              >
                Delete Selected
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

  //Functions
  //
  //
  //
  renderList = () => {
    if (this.state.ToDos.length !== 0) {
      return this.state.ToDos.map((element, index) => (
        <ToDo
          id={index}
          onDelete={this.removeAlert}
          changeState={this.changeState}
          toDo={element}
          uploadBool={this.state.uploadBool}
          getSelected={this.getSelected}
          selection={this.state.selection}
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
        checked: false,
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

  changeStateSelect = () => {
    this.setState({ selection: !this.state.selection });
  };

  toggleAllCheckbox = () => {
    let tmp = [];
    this.setState({ checkedAll: !this.state.checkedAll });
    const ToDos = this.state.ToDos.map((e) => {
      if (this.state.checkedAll) {
        e.checked = false;
      } else {
        e.checked = true;
      }
      return e;
    });
    this.setState({ ToDos });

    if (this.state.checkedAll) {
      this.setState({ selectedToDos: [] });
    } else {
      for (let i = 0; i < this.state.ToDos.length; i++) {
        tmp.push(this.state.ToDos[i].id);
      }
      console.log(tmp);
      this.setState({ selectedToDos: tmp });
      tmp = [];
    }
  };

  getSelected = (toDoID) => {
    const { selectedToDos } = this.state;
    const ToDos = this.state.ToDos.map((e) => {
      if (e.id === toDoID) e.checked = !e.checked;
      return e;
    });

    if (typeof selectedToDos.find((e) => e === toDoID) === "undefined") {
      this.setState({ selectedToDos: [...selectedToDos, toDoID], ToDos });
    } else {
      let tmp = selectedToDos.filter((e) => e !== toDoID);
      this.setState({
        selectedToDos: tmp,
        ToDos,
      });
    }
  };

  // Remove functions
  removeAlert = (toDoID) => {
    if (toDoID !== null)
      this.setState({
        removeAlertConfirm: true,
        removeToDoID: toDoID,
      });
    else
      this.setState({
        removeAlertConfirm: true,
      });
  };

  removeToDo = (confirmBool) => {
    if (!confirmBool)
      this.setState({ removeAlertConfirm: false, removeToDoID: null });
    else if (this.state.removeToDoID !== null && confirmBool) {
      const ToDos = this.state.ToDos.filter(
        (element) => element.id !== this.state.removeToDoID
      );
      this.setState({ ToDos }, () =>
        localStorage.setItem("ToDos", JSON.stringify(this.state.ToDos))
      );
    } else if (
      typeof this.state.selectedToDos !== "undefined" &&
      this.state.selectedToDos.length > 0 &&
      confirmBool
    ) {
      let ToDos = this.state.ToDos;
      this.state.selectedToDos.map(
        (e) => (ToDos = ToDos.filter((element) => element.id !== e))
      );
      console.log(ToDos);
      this.setState({ ToDos, selectedToDos: [] }, () =>
        localStorage.setItem("ToDos", JSON.stringify(this.state.ToDos))
      );
      if (this.state.checkedAll) this.setState({ checkedAll: false });
    }
    this.setState({ removeAlertConfirm: false, removeToDoID: null });
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
    if (
      typeof this.state.ToDos !== "undefined" &&
      this.state.ToDos.length > 0
    ) {
      const blob = new Blob([str]);
      const fileDownloadUrl = URL.createObjectURL(blob);
      this.setState({ fileType, fileDownloadUrl: fileDownloadUrl }, () => {
        this.dofileDownload.click();
        URL.revokeObjectURL(fileDownloadUrl); // free up storage--no longer needed.
        this.setState({ fileType: "", fileDownloadUrl: "" });
      });
    } else alert("There is nothing to download!");
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
        this.setState({ ToDos: this.state.tmpToDos, tmpToDos: [] }, () =>
          localStorage.setItem("ToDos", JSON.stringify(this.state.ToDos))
        );

      this.changeModal();
    } else
      alert("You didn't select a file to upload or it is in the wrong format!");
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
