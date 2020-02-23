const React = require('react');
const PropTypes = require('prop-types');

// вложенный компонент ProductRecord
const ProductRecord = require('./ProductRecord');

require('./ProductTable.css');
class ProductTable extends React.Component {

    static propTypes = {
        tableClassName: PropTypes.string,
        name: PropTypes.string,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                url: PropTypes.string.isRequired,
                quantity: PropTypes.number.isRequired,
            })
        ),
    };

    state = {
        selectedItemCode: null,
        stuff: this.props.items,
    };

    clicked = (code) => {
        this.setState({ selectedItemCode: code });
    };
    
    delete = (code) => {
        let newTableStuff = this.state.stuff.filter((el, i) => {
            if (i === code) return false;
            else return true;
        });
        this.setState({ stuff: newTableStuff, selectedItemCode: null });
    };
    
    deselect = (EO) => {
        this.setState({ selectedItemCode: null });
    };

    render() {
        let selectedClassName = 'highlight';
        let alignedClassName = 'tal';
        let tableCaption = this.props.name
            ? 'Список товаров магазина ' + this.props.name
            : 'Список товаров магазина ' + 'iShop';

        let keyCode = -1; // keyCode первого товара будет равен 0 И своему индексу в массиве stuff
        let tableHead = 
            <tr key={keyCode} onClick = {this.deselect}>
                <th data-type = "name">{"Название"}</th>
                <th data-type = "cost">{"Цена, USD"}</th>
                <th data-type = "url">{"Ссылка"}</th>
                <th data-type = "count">{"Ед. в наличии"}</th>
                <th data-type = "control">{"Управление"}</th>
            </tr>
        ;

        let tableRows = this.state.stuff.map(v =>
            <ProductRecord
                key = {++keyCode}
                code = {keyCode}
                name = {v.name}
                price = {v.price}
                url = {v.url}
                quantity = {v.quantity}
                selectedClassName = {selectedClassName}
                alignedClassName = {alignedClassName}
                selectedItemCode = {this.state.selectedItemCode}
                cbClicked = {this.clicked}
                cbDelete = {this.delete}
            />
        );

        return (
            <table className = {this.props.tableClassName || null} >
                <caption>{tableCaption}</caption>
                { tableHead }
                { tableRows }
            </table>
        )
        ;
    }

}

module.exports = ProductTable;