const React = require('react');
const PropTypes = require('prop-types');

const ColorFrame = require('./color-frame');

function withRainbowFrame(props) {
  let colors = props;
  let Component = this;

  return function(props) {
    let nextColor = colors.pop();

    // Component.propTypes = {
    //   colors: PropTypes.array,
    // }

    return (
      <ColorFrame color={nextColor}>
        {
          (colors.length>0) ?
            <Component colors={colors}>
              {props.children}
            </Component>
            :
            props.children
        }
      </ColorFrame>
    )
  }
}

module.exports = withRainbowFrame;