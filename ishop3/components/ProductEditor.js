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
        name: this.props.name,
        price: this.props.price,
        url: this.props.url,
        quantity: this.props.quantity,
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
            name: this.state.name,
            price: parseFloat(this.state.price),
            url: this.state.url,
            quantity: parseInt(this.state.quantity),
        });
        this.props.cbDisableOther(false);
    }

    render() {

        return (
            <div className={ "ProductCard" }>
                <input
                    type="text"
                    name="name"
                    onChange={ this.fieldChanged }
                    value={ this.state.name }
                />
                <input
                    type="text"
                    name="price"
                    onChange={ this.fieldChanged }
                    value={ this.state.price }
                />
                <input
                    type="text"
                    name="url"
                    onChange={ this.fieldChanged }
                    value={ this.state.url }
                />
                <input
                    type="text"
                    name="quantity"
                    onChange={ this.fieldChanged }
                    value={ this.state.quantity }
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
