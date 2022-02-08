import React, { Component } from "react";
import ToDo from "./ToDo";
import uniqid from "uniqid";
import { Dropdown, ButtonGroup } from "react-bootstrap";

class ToDoList extends Component {
  state = {
    ToDos: [],
    input: "",
  };

  render() {
    return (
      <div className="top bg-light">
        <h1 className="text-center">To-Do List</h1>

        <form className="d-flex mb-3 ms-3 me-3" onSubmit={this.addToDo}>
          <label className="d-flex flex-fill">
            <input
              type="text"
              name="toDo"
              className="d-flex flex-fill inputText"
              placeholder="Write new To-Do"
              onChange={(event) => this.setState({ input: event.target.value })}
              value={this.state.input}
            />
          </label>

          <Dropdown as={ButtonGroup}>
            <input
              type="submit"
              value="Submit"
              className="d-flex btn btn-primary btnSubmit"
            />

            <Dropdown.Toggle
              split
              variant="primary"
              id="dropdown-split-basic"
            />

            <Dropdown.Menu>
              <Dropdown.Item onClick={this.removeAllToDo}>
                Remove All
              </Dropdown.Item>
              <Dropdown.Item>[WIP] Export</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </form>

        <ul className="list-group list-group-flush">{this.renderList()}</ul>
      </div>
    );
  }

  renderList = () => {
    if (this.state.ToDos.length !== 0) {
      return this.state.ToDos.map((element, index) => (
        <ToDo id={index} onDelete={this.removeToDo} toDo={element} />
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
      //create new object to add
      const obj = {
        id: uniqid("listel-"),
        value: event.target.elements.toDo.value,
      };
      //add the new ToDo to the array
      this.setState({
        ToDos: [...this.state.ToDos, obj],
        input: "",
      });
    }
  };

  removeToDo = (toDoID) => {
    const ToDos = this.state.ToDos.filter((element) => element.id !== toDoID);
    this.setState({ ToDos });
  };
  removeAllToDo = () => {
    this.setState({ ToDos: [] });
  };
}

export default ToDoList;
