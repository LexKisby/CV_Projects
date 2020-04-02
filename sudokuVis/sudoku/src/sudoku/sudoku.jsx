import React from "react";
import "./sudoku.css";
import * as sudoku from "../sudokuAlg/sudoalg.js";
import * as seed from "../seeds/seeds.js";
import * as Node from "./node.jsx";

export default class SudokuVis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notepad: [],
      workspace: [],
      mounting: true
    };
  }

  componentDidMount() {
    const grid = [];
    for (let a = 0; a < 9; a++) {
      const currentRow = [];
      for (let b = 0; b < 9; b++) {
        var currentNode = { b, a, num: 0, colour: "white", type: 0 };
        currentRow.push(currentNode);
      }
      grid.push(currentRow);
    }
    console.log("grid", grid);
    this.setState({ grid });
    this.setState({ mounting: false });
    this.loadPuzzle();
  }

  loadPuzzle() {
    const initial = seed.getPuzz();
    console.log(initial);
    this.setState({ initial });
    this.solve(initial);
    return;
  }

  solve(array) {
    var solution = [];
    console.log("going in", array, solution);
    sudoku.backTrack(array, solution);
    console.log(solution);
    this.setState({ solution });
  }

  makeGrid() {
    const grid = [];
    for (let a = 0; a < 9; a++) {
      const currentRow = [];
      for (let b = 0; b < 9; b++) {
        currentRow.push({ b, a, num: 0, colour: "white", type: 0 });
      }
      grid.push([currentRow]);
    }
    this.setState({ grid });
  }

  solveAnimate() {}

  reset() {}

  check() {}

  note() {}

  render() {
    //const { array } = this.state;
    console.log(this.state);
    const { grid } = this.state;
    const { initial } = this.state;
    if (this.state.mounting) {
      console.log("nulled");
      return null;
    }
    return (
      <>
        <div className="jumbotron card card-image" id="j">
          <div className="text-white text-center py-5 px-4">
            <div>
              <h1 className="card-title h1-responsive pt-3 mb-5 font-bold">
                <strong>Sudoku Web App</strong>
              </h1>
              <p className="mx-5 mb-5">Little web app to solve sudokus</p>
              <hr className="my-4"></hr>
              <div className="row">
                <div className="col-sm-5">
                  <br></br>
                  <br></br>
                  <div className="card" id="sudoku1">
                    <div className="grid">
                      {grid.map((row, rowIdx) => {
                        console.log(row, rowIdx);
                        return (
                          <div className="row" key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                              console.log(node, nodeIdx);
                              const { num, a, b, colour, type } = node;
                              return (
                                <div className="cell">
                                  <h2> {initial[a][b]} </h2>
                                </div> /*
                                <Node
                                  key={nodeIdx}
                                  col={a}
                                  row={b}
                                  colour={colour}
                                  type={type}
                                  num={num}
                                ></Node>*/
                              );
                            })}
                          </div>
                        );
                      })}
                      }
                    </div>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="card" id="control">
                    <button
                      className="btn btn-outline-white btn-lg"
                      onClick={() => this.loadPuzzle()}
                    >
                      <i className="fas fa-clone left"></i>
                      New Sudoku
                    </button>
                    <br></br>
                    <br></br>
                    <button
                      className="btn btn-outline-white btn-lg"
                      onClick={() => this.reset()}
                    >
                      <i className="fas fa-clone left"></i> Reset Sudoku
                    </button>
                    <br></br>
                    <br></br>
                    <button
                      className="btn btn-outline-white btn-lg"
                      onClick={() => this.solveAnimate()}
                    >
                      <i className="fas fa-clone left"></i> Solve Sudoku
                    </button>
                    <br></br>
                    <br></br>
                    <button
                      className="btn btn-outline-white btn-lg"
                      onClick={() => this.check()}
                    >
                      <i className="fas fa-clone left"></i> Check Sudoku
                    </button>
                  </div>
                </div>
                <div className="col-sm-5">
                  <br></br>
                  <br></br>
                  <div className="card" id="sudoku2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
