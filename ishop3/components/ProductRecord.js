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
        alignedClassName: PropTypes.string,
        selectedItemCode: PropTypes.number,
        cbClicked: PropTypes.func.isRequired,
        cbDelete: PropTypes.func.isRequired,
        cbEdit: PropTypes.func.isRequired,
        disableEdit: PropTypes.bool.isRequired,
    };

    recordClicked = (EO) => {
        this.props.cbClicked({
            code: this.props.code,
            name: this.props.name,
            price: this.props.price,
        });
    };

    recordDelete = (EO) => {
        EO.stopPropagation();
        if (confirm(`Удалить запись о товаре ${this.props.name}?`))
            this.props.cbDelete(this.props.code);
        else
            return;
    };

    recordEdit = (EO) => {
        EO.stopPropagation();
        this.props.cbEdit({
            code:       this.props.code,
            name:       this.props.name,
            price:      this.props.price,
            url:        this.props.url,
            quantity:   this.props.quantity
        });
    };

    render() {
        let alignedClassName = this.props.alignedClassName;
        let selectedClassName = (this.props.selectedItemCode === this.props.code)
            ? this.props.selectedClassName
            : null;
        return (
            <tr className={ selectedClassName } onClick={ this.recordClicked }>
                <td className={ alignedClassName }>{ this.props.name }</td>
                <td>{ this.props.price }</td>
                <td className={ alignedClassName }>{ this.props.url }</td>
                <td>{ this.props.quantity }</td>
                <td> 
                    <input type={ 'button' } onClick={ this.recordEdit } value={ 'Edit' }
                        disabled={ this.props.disableEdit } />
                    <input type={ 'button' } onClick={ this.recordDelete } value={ 'Delete' }
                        disabled={ this.props.disableEdit } />
                </td>
            </tr>
        );
    }


}

module.exports = ProductRecord;