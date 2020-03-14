const React = require('react');
const {Fragment} = require('react');

require('./style.css');

module.exports = props => {
  let words = props.text.split(/<br *\/?>/gi);
  let jsxWords = words.map((val, index) => {
    if (index < words.length-1 )
      return <Fragment key={index}>{val}<br/></Fragment>
    else
      return <Fragment key={index}>{val}</Fragment>
  });
  return (
    <div className="BR2jsx">{jsxWords}</div>
  );
};
