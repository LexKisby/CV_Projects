import React, { Component } from "react";
import "./node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { row, col } = this.props;
    return <div></div>;
  }
}

export const DEFAULT_NODE = {
  row: 0,
  col: 0
};
