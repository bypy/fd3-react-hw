const React = require('react');
const PropTypes = require('prop-types');


class ProductEditor extends React.Component {

    static propTypes = {
        code: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        cbOnChange: PropTypes.func.isRequired,
        cbOnSave: PropTypes.func.isRequired,
        cbOnCancel: PropTypes.func.isRequired
    };

    state = {
        unsavedChangesStatus: false,
        validStatus: true,
        name: this.props.name,
        price: this.props.price,
        url: this.props.url,
        quantity: this.props.quantity,
    };

    unsavedChanges = {};

    changeHandler = (EO) => {
        EO.preventDefault();
        this.props.cbOnChange(true);
        
        // TODO валидация
        this.unsavedChanges[EO.target.name] = EO.target.value;

        this.setState({
            unsavedChangesStatus: true,
            [EO.target.name]: EO.target.value
        })
    };

    saveHandler = (EO) => {
        EO.preventDefault();
        this.props.cbOnSave({
            code: this.props.code, // компонент не изменяет код товара
            name: this.state.name,
            price: parseFloat(this.state.price),
            url: this.state.url,
            quantity: parseInt(this.state.quantity),
        });
        this.props.cbOnChange(false);
    }

    cancelHandler = (EO) => {
        EO.preventDefault();
        this.props.cbOnCancel();
    }

    render() {

        return (
            <div className={ "ProductCard" }>
                <h2>
                    { (this.props.price === 0 && this.props.quantity === 0) ?
                        'Add new product'
                        :
                        'Product editor'
                    }
                </h2>
                <p>ID: { this.props.code }</p>

                <span>Name: </span>
                <input
                    type="text"
                    name="name"
                    onChange={ this.changeHandler }
                    value={ this.state.name }
                />
                <span>Price: </span>
                <input
                    type="text"
                    name="price"
                    onChange={ this.changeHandler }
                    value={ this.state.price }
                />
                <span>URL: </span>
                <input
                    type="text"
                    name="url"
                    onChange={ this.changeHandler }
                    value={ this.state.url }
                />
                <span>Quantity: </span>
                <input
                    type="text"
                    name="quantity"
                    onChange={ this.changeHandler }
                    value={ this.state.quantity }
                />
                <input
                    type="button"
                    name="save"
                    value="Save"
                    // TODO валидация
                    onClick={ this.saveHandler }
                />
                <input
                    type="button"
                    name="cancel"
                    value="Cancel"
                    onClick={ this.cancelHandler }
                />
            </div>
        );
    }
}

module.exports = ProductEditor;
