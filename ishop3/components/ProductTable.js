const React = require('react');
const {Fragment} = require('react');
const PropTypes = require('prop-types');

// вложенные компоненты
const ProductRecord = require('./ProductRecord');
const ProductCard = require('./ProductCard');

const selectedClassName = 'highlight';
const alignedClassName = 'tal';

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
                quantity: PropTypes.number.isRequired
            })
        ),
    };

    state = {
        workMode: null,
        selectedItem: {},
        stuff: this.props.items
    };

    clicked = (clikedItem) => {
        this.setState({
            workMode: 0,
            selectedItem: clikedItem,
        });
    };
    
    delete = (code) => {
        let newTableStuff = this.state.stuff.filter((el, i) => {
            if (i === code) return false;
            else return true;
        });
        this.setState({ 
            stuff: newTableStuff,
            workMode: null,
            selectedItem: { 
                code: null
            }
        });
    };
    
    deselect = (EO) => {
        this.setState({
            workMode: null,
            selectedItem: { 
                code: null
            }
        });
    };

    render() {

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

        let tableBody = this.state.stuff.map(v =>
            <ProductRecord
                key = {++keyCode}
                code = {keyCode}
                name = {v.name}
                price = {v.price}
                url = {v.url}
                quantity = {v.quantity}
                selectedClassName = {selectedClassName}
                alignedClassName = {alignedClassName}
                selectedItemCode = {this.state.selectedItem.code}
                cbClicked = {this.clicked}
                cbDelete = {this.delete}
            />
        );

        return (
            <Fragment>
                <table className = {this.props.tableClassName || null} >
                    <caption>{tableCaption}</caption>
                    <thead>
                        { tableHead }
                    </thead>
                    <tbody>
                        { tableBody }
                    </tbody>
                </table>
                {
                    (this.state.workMode === 0) &&
                    <ProductCard
                        name = { this.state.selectedItem.name }
                        price = { this.state.selectedItem.price }
                    />
                }
            </Fragment>
        );
    }

}

module.exports = ProductTable;