"use strict";

const React = require("react");
const ReactDOM = require("react-dom");

const RainbowFrame = require("./components/rainbow-frame");

let colors = ["red", "orange", "yellow", "green", "#00BFFF", "blue", "purple"];

ReactDOM.render(
  <RainbowFrame colors={colors}>Hello!</RainbowFrame>,
  document.getElementById("container")
);
