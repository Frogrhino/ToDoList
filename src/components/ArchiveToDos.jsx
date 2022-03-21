import React, { Component } from "react";
import uniqid from "uniqid";
import ToDo from "./ToDo";

class ArchiveToDos extends Component {
  state = { ToDos: JSON.parse(localStorage.getItem("ToDos")) || [] };
  render() {
    return (
      <div className="top bg-light">
        <h1 className="text-center">Archived To-Dos</h1>

        {/* List of all the To Dos  */}
        <ul className="list-group list-group-flush">{this.renderList()}</ul>
      </div>
    );
  }

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
}

export default ArchiveToDos;
