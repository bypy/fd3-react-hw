'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const {Fragment} = require('react');

const withRainbowFrame = require('./components/withRainbowFrame');

let colors=['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
let FramedFragment = withRainbowFrame(colors)(Fragment);

ReactDOM.render(
  <FramedFragment>
    Hello!
  </FramedFragment>,
  document.getElementById('container')
);