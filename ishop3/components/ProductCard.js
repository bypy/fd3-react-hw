const React = require('react');
const PropTypes = require('prop-types');

require('./ProductCard.css');

class ProductCard extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
    };

    render() {
        return (
            <div className={"ProductCard"}>
                <h2>{this.props.name}</h2>
                <p>Price: {this.props.price}</p>
                <p>URL: {this.props.url}</p>
                <p>Quantity: {this.props.quantity}</p>
            </div>
        );
    }

}

module.exports = ProductCard;