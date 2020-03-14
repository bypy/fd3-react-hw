const React = require("react");

const ColorFrame = require("./color-frame");

function withRainbowFrame(colors) {
  return function(PassedComponent) {
    return function(props) {
      let result = <PassedComponent {...props}/>;
      colors.forEach(c => {
        result = <ColorFrame color={c}>{result}</ColorFrame>;
      });
      return result;
    };
  };
}

module.exports = withRainbowFrame;