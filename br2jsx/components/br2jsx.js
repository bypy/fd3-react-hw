const React = require('react');
const {Fragment} = require('react');

require('./style.css');

module.exports = props => {
  let words = props.text.split(/<br\s?\/?>/g);
  let jsxWords = words.map((val, index) => <Fragment key={index}>{val}<br/></Fragment>);
  return (
    <div className="BR2jsx">{jsxWords}</div>
  );
};
