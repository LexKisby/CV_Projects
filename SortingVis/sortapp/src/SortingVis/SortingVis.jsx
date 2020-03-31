import React from "react";
import "./SortingVis.css";

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
        array.push(between(5, 1000));
      }
    }
    this.setState({ array });
  }
  render() {
    const { array } = this.state;

    return (
      <>
        <div className="Control-bar">
          <h3>Control Bar</h3>
          <p>The controls are all here</p>
        </div>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}px` }}
            >
              {value}
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
