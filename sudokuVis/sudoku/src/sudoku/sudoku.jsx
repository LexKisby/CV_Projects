import React from "react";
import "./sudoku.css";
import * as sudoku from "../sudokuAlg/sudoalg.js";
import * as seed from "../seeds/seeds.js";

export default class SudokuVis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solution: []
    };
  }

  componentDidMount() {
    this.loadPuzzle();
  }

  loadPuzzle() {
    const seedarr = seed.getPuzz();
    console.log(seedarr);
    this.setState({ seedarr });
    this.solve(seedarr);
    return;
  }

  solve(array) {
    var solution = [];
    console.log("going in", array);
    solution = sudoku.backTrack(array, solution);
    console.log(solution);
  }

  solveAnimate() {}

  reset() {}

  check() {}

  note() {}

  render() {
    const { array } = this.state;
    console.log(this.state);
    return (
      <>
        <div>
          <p>{array}</p>
        </div>
      </>
    );
  }
}
