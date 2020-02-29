const React = require('react');
const PropTypes = require('prop-types');

const {isError} = require('../utils/validator');


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
    errors = {};

    changeHandler = (EO) => {
        EO.preventDefault();
        if (!this.state.unsavedChangesStatus) {
            // при первом изменении поля вызвать коллбек,
            // блокирующий контролы таблицы товаров
            this.props.cbOnChange(true);
        }
        
        // обновляем в state значение для данного поля
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
            name: (this.state.name).trim(),
            price: Number(this.state.price),
            url: (this.state.url).trim(),
            quantity: Number(this.state.quantity),
        });
        this.props.cbOnChange(false);
    }

    cancelHandler = (EO) => {
        EO.preventDefault();
        this.props.cbOnCancel();
    }

    render() {

        this.errors.name = isError.checkName(this.state.name);
        this.errors.price = isError.checkPrice(this.state.price);
        this.errors.url = isError.checkUrl(this.state.url);
        this.errors.quantity = isError.checkQuantity(this.state.quantity);

        const errorCount =
            this.errors.name.length +
            this.errors.price.length +
            this.errors.url.length +
            this.errors.quantity.length


        return (
            <div className={ 'ProductCard' }>
                <h2>
                    { (this.props.price === 0 && this.props.quantity === 0) ?
                        'Add new product'
                        :
                        'Product editor'
                    }
                </h2>
                <p>ID: { this.props.code } (name: {this.state.name})</p>

                <span>Name: </span>
                { // сообщение о невалидности
                    (this.errors.name.length > 0) &&
                    <span className='nonvalid'>{ this.errors.name.join(' | ') }</span>
                }
                <input
                    type='text'
                    name='name'
                    onChange={ this.changeHandler }
                    value={ this.state.name }
                    autoComplete='off'
                />
                <span>Price: </span>
                { // сообщение о невалидности
                    (this.errors.price.length > 0) &&
                    <span className='nonvalid'>{ this.errors.price.join(' | ') }</span>
                }
                <input
                    type='text'
                    name='price'
                    onChange={ this.changeHandler }
                    value={ this.state.price }
                    autoComplete='off'
                />
                <span>URL: </span>
                { // сообщение о невалидности
                    (this.errors.url.length > 0) &&
                    <span className='nonvalid'>{ this.errors.url.join(' | ') }</span>
                }
                <input
                    type='text'
                    name='url'
                    onChange={ this.changeHandler }
                    value={ this.state.url }
                    autoComplete='off'
                />
                <span>Quantity: </span>
                { // сообщение о невалидности
                    (this.errors.quantity.length > 0) &&
                    <span className='nonvalid'>{ this.errors.quantity.join(' | ') }</span>
                }
                <input
                    type='text'
                    name='quantity'
                    onChange={ this.changeHandler }
                    value={ this.state.quantity }
                    autoComplete='off'
                />
                <input
                    type='button'
                    name='save'
                    value='Save'
                    // TODO валидация
                    onClick={ this.saveHandler }
                    disabled = {errorCount && true}
                />
                <input
                    type='button'
                    name='cancel'
                    value='Cancel'
                    onClick={ this.cancelHandler }
                />
            </div>
        );
    }
}

module.exports = ProductEditor;
