const React = require('react');
const {Fragment} = require('react');
const PropTypes = require('prop-types');

// вложенные компоненты
const ProductRecord = require('./ProductRecord');
const ProductCard = require('./ProductCard');
const ProductEditor = require('./ProductEditor');

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
        
    selectedClassName = 'highlight';

    state = {
        workMode: null,
        unsaved: false,
        selectedItem: null,
        editItem: null,
        stuff: this.props.items
    };

    clickHandler = (clikedItem) => {
        this.setState({
            workMode: 0,
            selectedItem: clikedItem,
        });
    };

    editHandler = (editItem) => {
        this.setState({
            workMode: 2,
            selectedItem: null,
            editItem: editItem,
        });
    };
    
    deleteHandler = (code) => {
        let newTableStuff = this.state.stuff.filter((el, i) => {
            if (i === code) return false;
            else return true;
        });
        this.setState({ 
            stuff: newTableStuff,
            workMode: null,
            selectedItem: null
        });
    };

    addNewHandler = () => {
        this.setState({
            workMode: 1,
        })
    };
    
    cancelHandler = () => {
        this.setState({
            workMode: null,
            selectedItem:  null,
            unsaved: false
        });
    };

    unsavedHandler = (boolFlag) => {
        // режим запрещающего курсора и блокировки контролов таблицы товаров
        this.setState({
            unsaved: boolFlag, 
        });
    };

    saveHandler = (recordH) => {
        let newTableStuff = this.state.stuff.slice();

        if ( recordH.code === this.state.stuff.length ) {
            // новый товар
            newTableStuff.push(recordH);
        } else {
            // редактируемый товар
            let targetIndex = null;
            this.state.stuff.forEach((el, i) => {
                if (i === recordH.code) {
                    targetIndex = i;
                }
            });
            if (targetIndex !== null) {
                newTableStuff[targetIndex] = recordH;
            }
        }
        
        this.setState({
            stuff: newTableStuff,
            workMode: null,
        });

    };



    render() {

        let keyCode = -1; 
        let tableHead = 
            <tr key={keyCode} onClick = {!this.state.workMode ? this.cancelHandler : null}>
                <th data-type = 'name'>Название</th>
                <th data-type = 'cost'>Цена, USD</th>
                <th data-type = 'url'>Ссылка</th>
                <th data-type = 'count'>Ед. в наличии</th>
                <th data-type = 'control'>Управление</th>
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
                selectedClassName = { this.selectedClassName }
                selectedItemCode = {
                    (this.state.selectedItem) && 
                    this.state.selectedItem.code
                }
                cbOnClick = { this.state.unsaved ? null : this.clickHandler }
                cbOnDelete = { this.state.unsaved ? null : this.deleteHandler }
                cbOnEdit = { this.state.unsaved ? null : this.editHandler }
                disableControls = { this.state.unsaved }
            />
        );

        return (
            <Fragment>
                <table className = { this.props.tableClassName && this.props.tableClassName } >
                    <caption>
                        { this.props.name ? 
                            'Список товаров магазина ' + this.props.name
                            :
                            'Список товаров магазина ' + 'iShop'
                        }
                    </caption>
                    <thead>
                        { tableHead }
                    </thead>
                    <tbody>
                        { tableBody }
                    </tbody>
                </table>
                <div className='cardWrapper'>
                {
                    (this.state.workMode !== 1 && this.state.workMode !== 2) &&
                    <input type='button' onClick={ this.addNewHandler } value='New product' />
                }
                {
                    (this.state.workMode === 0) && // preview product
                    <ProductCard
                        name = { this.state.selectedItem.name }
                        price = { this.state.selectedItem.price }
                        url = { this.state.selectedItem.url }
                        quantity = { this.state.selectedItem.quantity }
                    />
                }
                {
                    (this.state.workMode === 1) && // new product
                    <ProductEditor
                        code = { this.state.stuff.length } // -1 сигнализирует о новом товаре
                        name = { '' }
                        price = { 0 }
                        url = ''
                        quantity = { 0 }
                        cbOnChange = { this.unsavedHandler }
                        cbOnSave = { this.saveHandler }
                        cbOnCancel = { this.cancelHandler }
                    />
                }
                {
                    (this.state.workMode === 2) && // edit product
                    <ProductEditor
                        key={ this.state.editItem.code } 
                        code = { this.state.editItem.code }
                        name = { this.state.editItem.name }
                        price = { this.state.editItem.price }
                        url = { this.state.editItem.url }
                        quantity = { this.state.editItem.quantity }
                        cbOnChange = { this.unsavedHandler }
                        cbOnSave = { this.saveHandler } 
                        cbOnCancel = { this.cancelHandler }  
                    />
                }
                </div>
            </Fragment>
        );
    }

}

module.exports = ProductTable;