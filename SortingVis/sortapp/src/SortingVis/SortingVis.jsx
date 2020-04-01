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
    this.resetArray(1);
  }

  resetArray(contiguous) {
    const array = [];
    if (contiguous) {
      for (let x = 1; x < 101; x++) {
        array.push(x * 8);
      }
      shuffle(array);
    } else {
      for (let x = 1; x < 101; x++) {
        array.push(between(5, 800));
      }
    }
    this.setState({ array });
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

  quick() {}

  merge() {
    const animations = sortingAlgorithms.mergeSort(this.state.array);
    const newAnimations = [];
    for (const animation of animations) {
      newAnimations.push(animation.comparison);
      newAnimations.push(animation.comparison);
      newAnimations.push(animation.write);
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
                onClick={() => this.resetArray(1)}
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
            <div className="inner-insert col-sm-3">
              <p>
                {" "}
                Insert your own array here. Recommended length less than 150{" "}
              </p>
            </div>
            <div className="inner-info col-sm-1"></div>
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
