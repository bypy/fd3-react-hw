const React = require('react');
const {Fragment} = require('react');

require('./style.css');

module.exports = props => {
  let words = props.text.split(/<br *\/?>/gi);
  let jsxWords = [];
  words.forEach((val, index) => {
    if (index) jsxWords.push(<br/>);
    jsxWords.push(val);
  });
  return jsxWords;
};
