'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const {Fragment} = require('react');


let colors=['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
const hoc = require('./components/withRainbowFrame');
const withRainbowFrame = hoc.bind(Fragment);

let FramedFragment = withRainbowFrame(colors);

ReactDOM.render(
  <FramedFragment>
    Hello!
  </FramedFragment>,
  document.getElementById('container')
);