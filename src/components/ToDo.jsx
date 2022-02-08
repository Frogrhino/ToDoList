import React, { Component } from "react";

class ToDo extends Component {
  state = {
    timeStampCreated: new Intl.DateTimeFormat("en-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(Date.now()),
    timeStampDone: "",
    class: "list-group-item d-flex flex-fill inProgress",
    selected: true,
  };

  render() {
    const { selected, timeStampCreated, timeStampDone } = this.state;
    const {
      toDo: { value, id },
    } = this.props;

    return (
      <div className="d-flex p-2">
        {/* Done button */}
        <div
          className="btn-group"
          role="group"
          aria-label="Basic checkbox toggle button group"
        >
          <input
            type="checkbox"
            className="btn-check"
            id={"btncheck-" + id}
            autoComplete="off"
            onClick={() => this.changeState(selected)}
            checked={!selected}
            readOnly
          />
          <label
            className="btn btn-success d-flex align-items-center"
            htmlFor={"btncheck-" + id}
          >
            {this.renderLabelImage()}
          </label>
        </div>

        {/* Middle part: To-Dos and Timestamps*/}
        <div className="d-flex flex-fill flex-column">
          <div className="list-group-item d-flex justify-content-between timeStamp">
            <div className="timeStampStart">Created: {timeStampCreated}</div>
            <div className="timeStampDone">{timeStampDone}</div>
          </div>
          <li
            key={id}
            id={id}
            onClick={() => this.changeState(selected)}
            className={this.state.class}
          >
            {value}
          </li>
        </div>

        {/* Delete button */}
        <button
          className="btn btn-danger d-flex align-items-center"
          onClick={() => this.props.onDelete(id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            className="bi bi-trash-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
          </svg>
        </button>
      </div>
    );
  }

  renderLabelImage = () => {
    if (this.state.selected)
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          className="bi bi-journal"
          viewBox="0 0 16 16"
        >
          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
        </svg>
      );
    else
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          className="bi bi-journal-check"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"
          />
          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
        </svg>
      );
  };

  changeState = (selected) => {
    let str = this.state.class.substr(0, 33);
    if (selected) {
      this.setState({
        class: str + "done",
        timeStampDone:
          "Done: " +
          new Intl.DateTimeFormat("en-DE", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }).format(Date.now()),
        selected: false,
      });
    } else {
      this.setState({
        class: str + "inProgress",
        timeStampDone: "",
        selected: true,
      });
    }
  };
}

export default ToDo;
