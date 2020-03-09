const React = require('react');
const PropTypes = require('prop-types');

const ColorFrame = require('./color-frame');

const RainbowFrame = props => {
  let colors = props.colors.slice();
  let nextColor = colors.pop();

  if (!nextColor) return 'Ошибка! Передан пустой массив цветов!';
  else return (
    <ColorFrame color={nextColor}>
      {
        (colors.length>0) ?
          <RainbowFrame colors={colors}>
            {props.children}
          </RainbowFrame>
          :
          props.children
      }
    </ColorFrame>
  )
}

RainbowFrame.propTypes = {
  colors: PropTypes.array,
}

module.exports = RainbowFrame;
