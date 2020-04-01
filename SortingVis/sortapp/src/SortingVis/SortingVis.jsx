import React from "react";
import "./SortingVis.css";
import * as sortingAlgorithms from "../sortingAlgorithms/sortalg.js";

export default class SortingVis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: []
    };
  }

  componentDidMount() {
    this.resetArray(1, []);
  }

  resetArray(code, arr) {
    const array = [];
    if (code === 1) {
      for (let x = 1; x < 101; x++) {
        array.push(x * 8);
      }
      shuffle(array);
    } else if (code === 0) {
      for (let x = 1; x < 101; x++) {
        array.push(between(5, 800));
      }
    } else if (code === 2) {
      for (const element of arr) {
        array.push(element * 8);
      }
    }
    this.setState({ array });
  }

  insertList() {
    var insert = document.getElementsByClassName("form-control");
    console.log(insert[0].value);
    console.log(typeof insert[0].value);
    console.log(JSON.parse(insert[0].value));
    var insertlist = JSON.parse(insert[0].value);
    this.resetArray(2, insertlist);
  }

  bubble() {
    const animations = sortingAlgorithms.bubbleSort(this.state.array);
    const newAnimations = [];
    for (const animation of animations) {
      newAnimations.push(animation.comparison);
      newAnimations.push(animation.comparison);
      newAnimations.push(animation.swap);
    }
    console.log(newAnimations);
    for (let i = 0; i < newAnimations.length; i++) {
      const arraybars = document.getElementsByClassName("array-bar");
      const isColourChange = i % 3 !== 2;
      if (isColourChange) {
        const [barOneIdx, barTwoIdx] = newAnimations[i];
        const barOneStyle = arraybars[barOneIdx].style;
        const barTwoStyle = arraybars[barTwoIdx].style;
        const colour = i % 3 === 0 ? "red" : "lightseagreen";
        setTimeout(() => {
          barOneStyle.backgroundColor = colour;
          barTwoStyle.backgroundColor = colour;
        }, i * 1);
      } else {
        setTimeout(() => {
          const [
            barOneIdx,
            barOneHeight,
            barTwoIdx,
            barTwoHeight
          ] = newAnimations[i];
          const temp = arraybars[barOneIdx].style;
          const tempn = arraybars[barOneIdx].innerHTML;
          arraybars[barOneIdx].style = arraybars[barTwoIdx].style;
          arraybars[barOneIdx].style.height = `${barTwoHeight}px`;
          arraybars[barOneIdx].innerHTML = arraybars[barTwoIdx].innerHTML;
          arraybars[barTwoIdx].style = temp;
          arraybars[barTwoIdx].style.height = `${barOneHeight}px`;
          arraybars[barTwoIdx].innerHTML = tempn;
        }, i * 1);
      }
    }
  }

  quick() {
    const animations = sortingAlgorithms.quickSort(this.state.array);
    console.log(animations);
    let i = 0;
    const arraybars = document.getElementsByClassName("array-bar");
    for (const animation of animations) {
      i++;
      const code = animation[0];
      if (code === 0) {
        const idx = animation[1];
        const barStyle = arraybars[idx].style;
        setTimeout(() => {
          barStyle.backgroundColor = "orange";
        }, i * 3);
      } else if (code === 1) {
        const idx = animation[1];
        const barStyle = arraybars[idx].style;
        setTimeout(() => {
          barStyle.backgroundColor =
            barStyle.backgroundColor === "lightseagreen"
              ? "red"
              : "lightseagreen";
        }, i * 3);
      } else if (code === 2) {
        const leftIdx = animation[1];
        const leftVal = animation[2];
        const rightIdx = animation[3];
        const rightVal = animation[4];
        const barOneStyle = arraybars[leftIdx].style;
        const barTwoStyle = arraybars[rightIdx].style;
        setTimeout(() => {
          barOneStyle.height = `${rightVal}px`;
          barTwoStyle.height = `${leftVal}px`;
          arraybars[leftIdx].innerHTML = `${rightVal / 8}`;
          arraybars[rightIdx].innerHTML = `${leftVal / 8}`;
        }, i * 3);
      } else if (code === 3) {
        setTimeout(() => {
          const idx = animation[1];
          arraybars[idx].style.backgroundColor = "purple";
        }, i * 3);
      }
    }
    for (let y = 0; y < this.state.array.length; y++) {
      i++;
      setTimeout(() => {
        arraybars[y].style.backgroundColor = "lightseagreen";
      }, i * 3);
    }
  }

  merge() {
    const animations = sortingAlgorithms.mergeSort(this.state.array);
    const newAnimations = [];
    for (const animation of animations) {
      newAnimations.push(animation.comparison);
      newAnimations.push(animation.comparison);
      newAnimations.push(animation.write);
    }
    for (let i = 0; i < newAnimations.length; i++) {
      const arraybars = document.getElementsByClassName("array-bar");
      const isColourChange = i % 3 !== 2;
      if (isColourChange) {
        const [barOneIdx, barTwoIdx] = newAnimations[i];
        const barOneStyle = arraybars[barOneIdx].style;
        const barTwoStyle = arraybars[barTwoIdx].style;
        const colour = i % 3 === 0 ? "red" : "lightseagreen";
        setTimeout(() => {
          barOneStyle.backgroundColor = colour;
          barTwoStyle.backgroundColor = colour;
        }, i * 4);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = newAnimations[i];
          const barOneStyle = arraybars[barOneIdx].style;
          arraybars[barOneIdx].innerHTML = `${newHeight / 8}`;
          barOneStyle.height = `${newHeight}px`;
        }, i * 4);
      }
    }
  }

  render() {
    const { array } = this.state;

    return (
      <>
        <div className="Control-bar">
          <div className="row">
            <div id="title" className="col-sm-2">
              <h3>Control Bar</h3>
              <p>The controls are all here</p>
            </div>

            <div className="inner-reset col-sm-2">
              <button
                className="btn btn-outline-danger"
                onClick={() => this.resetArray(1, [])}
              >
                Reset Array
              </button>
            </div>
            <div className="inner-alg col-sm-4">
              <h5>Algorithm type</h5>
              <div className="btn-group btn-group-sm" role="group">
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => this.merge()}
                >
                  Merge
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => this.bubble()}
                >
                  Bubble
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => this.quick()}
                >
                  QuickSort
                </button>
              </div>
            </div>
            <div className="inner-insert col-sm-2">
              <div className="md-form">
                <textarea
                  type="text"
                  id="insert"
                  name="message"
                  rows="2"
                  className="form-control md-textarea"
                ></textarea>
                <label htmlFor="message">Insert a list here</label>
              </div>
            </div>
            <div className="col-sm-1">
              <button
                className="btn btn-outline-danger"
                onClick={() => this.insertList()}
              >
                Insert
              </button>
            </div>
          </div>
        </div>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}px` }}
            >
              {value / 8}
            </div>
          ))}
        </div>
      </>
    );
  }
}

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
