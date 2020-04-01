import React from "react";
import "./sudoku.css";
import * as sudoku from "../sudokuAlg/sudoalg.js";
import * as seed from "../seeds/seeds.js";

export default class SudokuVis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: []
    };
  }

  componentDidMount() {
    this.loadPuzzle();
  }

  loadPuzzle() {
    const seedarr = seed.getPuzz();
    console.log(seedarr);
    this.setState = seedarr;
  }

  solve() {}

  solveAnimate() {}

  reset() {}

  check() {}

  note() {}

  render() {
    const { array } = this.state;

    return (
      <>
        <div>
          <p>{array}</p>
        </div>
      </>
    );
  }
}
