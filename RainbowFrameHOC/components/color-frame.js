const React = require('react');
const PropTypes = require('prop-types');

class ColorFrame extends React.Component {

  static propTypes = {
    color: PropTypes.string.isRequired,
  };
  
  render() {
    return (
      <div style={{border:"solid 8px "+this.props.color,padding:"8px"}}>
        <span style={{textAlign:'center', fontSize: '2rem', fontWeight: 'bold', lineHeight: '2.5em'}}>
          {this.props.children}
        </span>
      </div>
    );
  }

}

module.exports = ColorFrame;
