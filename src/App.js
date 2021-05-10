import TextInput from "./components/TextInput";
import Text from "./components/Text";
import React, { Component } from "react";
import Button from "./components/Button";
import Selector from "./components/Selector";

class App extends Component {
  state = {
    input: "",
    entries: [],
    inputValidityText: "",
    algorithm: "bubble sort",
    entryCount: 0,
  };

  sortingAlgorithms = ["bubble sort", "selection sort", "insertion sort"];

  HandleInputChange = (input) => {
    this.setState({ input });
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
    if (isValid) {
      this.setState({
        inputValidityText: "",
        entries: splitted,
        entryCount: splitted.length,
      });
    } else {
      this.setState({
        entries: [],
        entryCount: 0,
        inputValidityText: "Did not match pattern 1, 2, 3, ...",
      });
    }
    console.log("splitted", splitted);
    console.log("entries", this.state.entries);
  };

  handleBtnSortClick = (e) => {
    this.parseInput(this.state.input);
  };

  handleSelectionChange = (index) => {
    this.setState({
      algorithm: this.sortingAlgorithms[index],
    });
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
        </div>
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
        />
      </div>
    );
  }
}

export default App;
