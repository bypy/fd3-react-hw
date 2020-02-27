const React = require('react');
const PropTypes = require('prop-types');


class ProductEditor extends React.Component {

    static propTypes = {
        code: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        cbDisableOther: PropTypes.func.isRequired,
        cbUpdate: PropTypes.func.isRequired,
    };

    state = {
        unsavedChangesStatus: false,
        nameField: this.props.name,
        priceField: this.props.price,
        urlField: this.props.url,
        quantityField: this.props.quantity,
    };

    unsavedChanges = {};

    fieldChanged = (EO) => {
        EO.preventDefault();
        this.props.cbDisableOther(true);
        let changedFieldName = EO.target.getAttribute("name");
        
        // TODO валидация
        this.unsavedChanges[changedFieldName] = EO.target.value;

        this.setState({
            unsavedChangesStatus: true,
            [changedFieldName]: EO.target.value
        })
    };

    saveUpdated = (EO) => {
        EO.preventDefault();
        this.props.cbUpdate({
            code: this.props.code, // компонент не изменяет код товара
            name: this.state.nameField,
            price: parseFloat(this.state.priceField),
            url: this.state.urlField,
            quantity: parseInt(this.state.quantityField),
        });
        this.props.cbDisableOther(false);
    }

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
                <input
                    type="button"
                    name="update"
                    value="Update"
                    onClick={ this.saveUpdated }
                />
            </div>
        );
    }
}

module.exports = ProductEditor;
