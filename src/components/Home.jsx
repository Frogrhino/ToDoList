import React, { Component } from "react";
import nothing from "../assets/nothingtoseehere.gif";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="d-flex justify-content-center m-4">
        <img src={nothing} alt="Nothing to see here." />
      </div>
    );
  }
}

export default Home;
