const React = require('react');
const PropTypes = require('prop-types');


// require(./ProductEditor.css);
class ProductEditor extends React.Component {

    static propTypes = {
        code: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired
    };

    state = {
        unsavedChanges: false,
        nameField: this.props.name,
        priceField: this.props.price,
        urlField: this.props.url,
        quantityField: this.props.quantity,
    }

    fieldChanged = (EO) => {
        EO.preventDefault();
        let changedInputName = EO.target.getAttribute("name");
        this.setState({
            unsavedChanges: true,
            [changedInputName]: EO.target.value
        })
    };

    render() {

        return (
            <div className={"ProductCard"}>
                <input
                    type="text"
                    name="nameField"
                    onChange={ this.fieldChanged }
                    value={ this.state.nameField }
                />
                <input
                    type="text"
                    name="priceField"
                    onChange={ this.fieldChanged }
                    value={ this.state.priceField }
                />
                <input
                    type="text"
                    name="urlField"
                    onChange={ this.fieldChanged }
                    value={ this.state.urlField }
                />
                <input
                    type="text"
                    name="quantityField"
                    onChange={ this.fieldChanged }
                    value={ this.state.quantityField }
                />
            </div>
        );
    }
}

module.exports = ProductEditor;
