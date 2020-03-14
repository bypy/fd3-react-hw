'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const BR2jsx = require('./components/br2jsx');

let text = 'первый<br>второй<br/>третий<BR />последний';

ReactDOM.render(
  <BR2jsx text={text}/>
  , document.getElementById('container') 
);