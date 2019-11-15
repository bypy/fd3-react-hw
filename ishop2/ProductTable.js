let ProductTable = React.createClass({

    displayName: 'ProductTableComponent',

    propTypes: {
        className: React.PropTypes.string,
        name: React.PropTypes.string,
        items: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                name: React.PropTypes.string.isRequired,
                price: React.PropTypes.number.isRequired,
                url: React.PropTypes.string.isRequired,
                quantity: React.PropTypes.number.isRequired,
            })
        ),
        selectedClassName: React.PropTypes.string,
    },

    getInitialState: function () {
        return {
            selectedItemCode: null,
            stuff: this.props.items,
        }
    },

    clicked: function (EO) {
        this.setState({ selectedItemCode: this.getItemCode(EO.target) });
    },

    delete: function (EO) {
        EO.stopPropagation();
        let indexToDelete = this.getItemCode(EO.target);
        let newTableStuff = this.state.stuff.filter((el, i) => {
            if (i === indexToDelete) return false;
            else return true;
        });
        this.setState({ stuff: newTableStuff, selectedItemCode: null });
    },

    getItemCode: function (searchTag) {
        while (searchTag.nodeName !== 'TR') searchTag = searchTag.parentNode;
        return parseInt(searchTag.getAttribute('data-code'));
    },

    render: function () {
        let tableCaption = 'Список товаров магазина ';
        this.props.name
            ? tableCaption.concat('Список товаров магазина ', this.props.name)
            : tableCaption.concat('Список товаров магазина ', 'iShop');

        let keyCode = -1;
        let tableHead = React.DOM.tr({ key: keyCode },
            React.DOM.th({ 'data-type': 'name' }, "Название"),
            React.DOM.th({ 'data-type': 'cost' }, "Цена, USD"),
            React.DOM.th({ 'data-type': 'url' }, "Ссылка"),
            React.DOM.th({ 'data-type': 'count' }, "Ед. в наличии"),
            React.DOM.th({ 'data-type': 'control' }, "Управление"),
        ); // шапка таблицы
        let tableRows = this.state.stuff.map(v =>
            React.DOM.tr({
                key: ++keyCode,
                'data-code': keyCode,
                className: (this.state.selectedItemCode === keyCode
                    ? (this.props.selectedClassName || "highlight")
                    : null),
                onClick: this.clicked,
            },
                React.DOM.td({ className: 'tal' }, v.name),
                React.DOM.td(null, v.price),
                React.DOM.td({ className: 'tal' }, v.url),
                React.DOM.td(null, v.quantity),
                React.DOM.td(null,
                    React.DOM.input({ type: 'button', onClick: this.delete, value: "Delete" })
                ),
            )
        );
        tableRows.unshift(tableHead);

        return React.DOM.table({ className: (this.props.className || null) },
            React.DOM.caption(null, tableCaption),
            React.DOM.tbody(null, tableRows),
        );
    } // end of render

}); // end of ProductTable