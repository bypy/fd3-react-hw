const React = require('react');
const PropTypes = require('prop-types');


require('./ProductRecord.css');
class ProductRecord extends React.Component {

    static propTypes = {
        code: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        selectedClassName: PropTypes.string,
        selectedItemCode: PropTypes.number,
        cbOnClick: PropTypes.func, // не передаю 
        cbOnDelete: PropTypes.func, // когда контролы в таблице 
        cbOnEdit: PropTypes.func, // и выделение рядов надо заблокировать
        disableControls: PropTypes.bool.isRequired,
    };

    clickHandler = (EO) => {
        EO.stopPropagation();
        EO.preventDefault();
        this.props.cbOnClick({
            code: this.props.code,
            name: this.props.name,
            price: this.props.price,
            url: this.props.url,
            quantity: this.props.quantity,
        });
    };

    editHandler = (EO) => {
        EO.stopPropagation();
        EO.target.blur();
        this.props.cbOnEdit({
            code:       this.props.code,
            name:       this.props.name,
            price:      this.props.price,
            url:        this.props.url,
            quantity:   this.props.quantity
        });
    };

    deleteHandler = (EO) => {
        EO.stopPropagation();
        EO.target.blur(); //  отменить "наследование" фокуса кнопкой следующего ряда (Firefox)
        if (confirm(`Удалить запись о товаре ${this.props.name}?`))
            this.props.cbOnDelete(this.props.code);
        else
            return;
    };

    render() {

        let rowStateClass;
        if (this.props.selectedItemCode === this.props.code)
            rowStateClass = this.props.selectedClassName
        else if (this.props.disableControls)
            rowStateClass = 'nocontrols'
        else
            rowStateClass = null

        return (
            <tr className={ rowStateClass }
                onClick={ this.props.cbOnClick && this.clickHandler }>
                
                <td className='tal'>{ this.props.name }</td>
                <td>{ this.props.price }</td>
                <td className='tal'>{ this.props.url }</td>
                <td>{ this.props.quantity }</td>
                <td> 
                    <input type='button' onClick={ this.props.cbOnEdit && this.editHandler }
                        value={ 'Edit' } disabled={ this.props.disableControls }/>
                    <input type='button' onClick={ this.props.cbOnDelete && this.deleteHandler }
                        value={ 'Delete' } disabled={ this.props.disableControls }/>
                </td>
            </tr>
        );
    }


}

module.exports = ProductRecord;