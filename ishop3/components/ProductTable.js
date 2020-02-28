const React = require('react');
const {Fragment} = require('react');
const PropTypes = require('prop-types');

// вложенные компоненты
const ProductRecord = require('./ProductRecord');
const ProductCard = require('./ProductCard');
const ProductEditor = require('./ProductEditor');

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
        unsaved: false,
        selectedItem: {},
        editItem: {},
        stuff: this.props.items
    };

    clicked = (clikedItem) => {
        this.setState({
            workMode: 0,
            selectedItem: clikedItem,
        });
    };

    edit = (editItem) => {
        this.setState({
            workMode: 2,
            selectedItem: null,
            editItem: editItem
        });
    };
    
    del = (code) => {
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
                code: null,
            }
        });
    };

    addNew = () => {
        this.setState({
            workMode: 1,
        })
    };

    changing = (flag) => {
        this.setState({
            unsaved: flag
        });
    };

    saveChanged = (updatedItem) => {
        let targetIndex = null;
        this.state.stuff.forEach((el, i) => {
            if (i === updatedItem.code) {
                targetIndex = i;
            }
        });
        if (targetIndex !== null) {
            let newTableStuff = this.state.stuff.slice();
            newTableStuff[targetIndex] = updatedItem;
            this.setState({
                stuff: newTableStuff,
                workMode: null,
                selectedItem: { 
                    code: null
                }
            });
        }
    };



    render() {

        let tableCaption = this.props.name
            ? 'Список товаров магазина ' + this.props.name
            : 'Список товаров магазина ' + 'iShop';

        let keyCode = -1; 
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
                key = { ++keyCode } // keyCode первого товара будет равен 0 И своему индексу в массиве stuff
                code = { keyCode }
                name = { v.name }
                price = { v.price }
                url = { v.url }
                quantity = { v.quantity }
                selectedClassName = { selectedClassName }
                alignedClassName = { alignedClassName }
                selectedItemCode = {
                    (this.state.selectedItem) && 
                    this.state.selectedItem.code
                }
                cbClicked = { this.clicked }
                cbDelete = { this.del }
                cbEdit = { this.edit }
                disableDelete = { this.state.unsaved }
            />
        );

        return (
            <Fragment>
                <table className = { this.props.tableClassName || null } >
                    <caption>{ tableCaption }</caption>
                    <thead>
                        { tableHead }
                    </thead>
                    <tbody>
                        { tableBody }
                    </tbody>
                </table>
                <div className={"cardWrapper"}>
                {
                    (this.state.workMode !== 1 && this.state.workMode !== 2) &&
                    <input type={ 'button' } onClick={ this.addNew } value={ 'New product' } />
                }
                {
                    (this.state.workMode === 0) &&
                    <ProductCard
                        name = { this.state.selectedItem.name }
                        price = { this.state.selectedItem.price }
                        url = { this.state.selectedItem.url }
                        quantity = { this.state.selectedItem.quantity }
                    />
                }
                {
                    (this.state.workMode === 1) &&
                    <p>Компонент нового товара здесь</p>
                }
                {
                    (this.state.workMode === 2) &&
                    <ProductEditor
                        key={ this.state.editItem.code } 
                        code = { this.state.editItem.code }
                        name = { this.state.editItem.name }
                        price = { this.state.editItem.price }
                        url = { this.state.editItem.url }
                        quantity = { this.state.editItem.quantity }
                        cbDisableDel = { this.changing }
                        cbUpdate = { this.saveChanged }    
                    />
                }
                </div>
            </Fragment>
        );
    }

}

module.exports = ProductTable;