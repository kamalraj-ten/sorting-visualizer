import TextInput from "./components/TextInput";
import Text from "./components/Text";
import React, { Component } from "react";
import Button from "./components/Button";
import Selector from "./components/Selector";
import BubbleSort from "./sorting_algorithms/BubbleSort";
import Graph from "./components/Graph";
import SelectionSort from "./sorting_algorithms/SelectionSort";
import InsertionSort from "./sorting_algorithms/InsertionSort";

class App extends Component {
  state = {
    input: "",
    entries: [],
    inputValidityText: "",
    algorithm: "bubble sort",
    entryCount: 0,
    horizontalUnits: 0,
    verticalUnits: 0,
    queue: [],
    sorting: false,
    i: -1,
    j: -1,
    swapI: -1,
    swapJ: -1,
    explainer: "",
    key: NaN,
  };

  sortingAlgorithms = ["bubble sort", "selection sort", "insertion sort"];

  algoMap = {
    "bubble sort": BubbleSort,
    "selection sort": SelectionSort,
    "insertion sort": InsertionSort,
  };

  HandleInputChange = (input) => {
    this.setState({ input });
  };

  componentWillUnmount() {
    if (!this.timer) clearInterval(this.timer);
  }

  getVerticalUnits = (arr) => {
    let max = arr.reduce((a, b) => Math.max(a, b));

    if (max % 10 === 0) return max + 1;
    if (max < 10) return 11;

    let digits = 0;
    let finalDigit = 0;
    while (max > 0) {
      finalDigit = max % 10;
      ++digits;
      max = Math.floor(max / 10);
    }
    return (finalDigit + 1) * 10 ** (digits - 1);
  };

  parseInput = (input) => {
    const splitted = input
      .split(",")
      .filter((s) => s !== "")
      .map((num) => parseInt(num));
    let isValid = true;
    for (let i = 0; i < splitted.length; ++i) {
      if (!splitted[i]) isValid = false;
    }
    if (isValid && splitted.length < 11) {
      this.setState({
        inputValidityText: "",
        entries: splitted,
        entryCount: splitted.length,
        verticalUnits: this.getVerticalUnits(splitted),
        horizontalUnits: 2 * splitted.length + 1,
      });
    } else {
      this.setState({
        entries: [],
        entryCount: 0,
        inputValidityText:
          "Did not match pattern 1, 2, 3, ... or count should be less than 11",
      });
    }
    console.log("splitted", splitted);
    console.log("entries", this.state.entries);
  };

  handleBtnSortClick = (e) => {
    this.parseInput(this.state.input);
    this.setState({ sorting: true });
    this.sort();
  };

  handleSelectionChange = (e) => {
    this.setState({
      algorithm: this.sortingAlgorithms[e.target.options.selectedIndex],
    });
  };

  // functions for the bar control
  addSelectToQueue = (queue, i, j) => {
    queue.push({
      type: "SELECT",
      i: i,
      j: j,
    });
  };

  addSwapToQueue = (queue, i, j) => {
    queue.push({
      type: "SWAP",
      i: i,
      j: j,
    });
  };

  addCompareToQueue = (queue, i, key) => {
    queue.push({
      type: "COMPARE",
      i: i,
      key: key,
    });
  };

  // an function to copy the content from i to j
  // used in insertion sort
  addCopyToQueue = (queue, i, j) => {
    queue.push({
      type: "COPY",
      i: i,
      j: j,
    });
  };

  // function to command to set content of index i to key
  addSetToQueue = (queue, i, key) => {
    queue.push({
      type: "SET",
      i: i,
      key: key,
    });
  };

  swap = (arr, a, b) => {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  };

  copy = (arr, a, b) => {
    arr[b] = arr[a];
  };

  executeQueue = () => {
    this.timer = setInterval(() => {
      if (this.state.queue.length === 0) {
        clearInterval(this.timer);
        this.setState({
          sorting: false,
          i: -1,
          j: -1,
          swapI: -1,
          swapJ: -1,
          explainer: "",
          key: NaN,
        }); // stop sorting
        console.log("completed sorting");
      } else {
        const queue = [...this.state.queue];
        const entries = [...this.state.entries];
        const change = queue.shift();
        let swapI = change.i;
        let swapJ = change.j;
        let i = swapI;
        let j = swapJ;
        let explainer;
        let key = NaN;
        console.log("change", change);
        if (change.type === "SWAP") {
          // swap command
          this.swap(entries, change.i, change.j);
          i = j = -1;
          explainer = "swapping index : " + swapI + " and index : " + swapJ;
        } else if (change.type === "SELECT") {
          // select and comparison
          swapI = swapJ = -1;
          explainer =
            "selecting and comparing index : " + i + " and index : " + j;
        } else if (change.type === "COMPARE") {
          // comparison with key
          swapI = swapJ = -1;
          j = -1;
          key = change.key;
          i = change.i;
          explainer = "comparing index : " + i + " with the key : " + key;
        } else if (change.type === "COPY") {
          // copy command
          i = j = -1;
          swapI = change.i;
          swapJ = change.j;
          this.copy(entries, swapI, swapJ);
          explainer =
            "copying content in index : " + swapI + " with index : " + swapJ;
        } else {
          // set command
          swapI = change.i;
          i = j = -1;
          swapJ = -1;
          key = change.key;
          // simply setting
          entries[swapI] = key;
          explainer = "set index : " + swapI + " value to " + key;
        }
        console.log("entries", entries);
        this.setState({
          swapI,
          swapJ,
          i,
          j,
          queue,
          entries,
          explainer,
          key,
        });
      }
    }, 1000);
  };

  sort = () => {
    const algoFunction = this.algoMap[this.state.algorithm];
    console.log(this.state.algorithm);
    const queue = algoFunction(
      this.state.entryCount,
      this.state.entries,
      this.addSwapToQueue,
      this.addSelectToQueue,
      this.addCompareToQueue,
      this.addCopyToQueue,
      this.addSetToQueue
    );
    console.log("queue", queue);
    this.setState({ queue }, () => {
      this.executeQueue();
    });
  };

  setEntries = (arr) => {
    this.setState({ entries: arr });
  };

  render() {
    return (
      <div className="main-container">
        <Text class="mt-20 mb-10 logo" text="Sorting Visualizer" />
        <div className="entry-container">
          <TextInput
            input={this.state.input}
            inputName="input"
            onChangeHandler={this.HandleInputChange}
            before="["
            after="]"
            validity={this.state.inputValidityText}
          />
          <Text
            class="ml-20 counter"
            text={"count : " + this.state.entryCount}
          />
          <Selector
            class="mt-20"
            value={this.state.algorithm}
            options={this.sortingAlgorithms}
            onChangeHandler={this.handleSelectionChange}
          />
          <Button
            text="sort"
            class="ml-10 mt-20"
            onClickHandler={this.handleBtnSortClick}
            sorting={this.state.sorting}
          />
        </div>
        <Graph
          entries={this.state.entries}
          horizontalUnits={this.state.horizontalUnits}
          verticalUnits={this.state.verticalUnits}
          i={this.state.i}
          j={this.state.j}
          swapI={this.state.swapI}
          swapJ={this.state.swapJ}
          explainer={this.state.explainer}
        />
      </div>
    );
  }
}

export default App;
