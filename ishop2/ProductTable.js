var ProductTable = React.createClass({

    displayName: 'ProductTableComponent',

    propTypes: {
        name: React.PropTypes.string,
        
    }

    render: function() {
        var tableCaption = "Список товаров магазина " + this.props.shop;
        var itemRecords = [];
        var itemRec = 
            React.DOM.tr( {key: 0}, // React "заставил" добавить key и здесь
                React.DOM.th(null, "Название"),
                React.DOM.th(null, "Цена, USD"),
                React.DOM.th(null, "Фото"),
                React.DOM.th(null, "Ед. в наличии")
            ); // шапка таблицы
        itemRecords.push(itemRec); 
        this.props.items.forEach(function(item){
            itemRec = 
                React.DOM.tr( {key: item.code},
                    React.DOM.td( null, item.item ),
                    React.DOM.td( null, item.price ),
                    React.DOM.td( null,
                        React.DOM.img( {src: item.photoUrl, width: "250"} ),
                    ),
                    React.DOM.td( null, item.quantity ),
                );
            itemRecords.push(itemRec);
        });
        return 	React.DOM.table( {className: "ProductTable"},
                    React.DOM.caption( null, 
                          React.DOM.em( null, tableCaption ), // em не для стилизации, но для практики :)
                    ),
                    React.DOM.tbody( null, itemRecords),
                );
    } // end of render

}); // end of ProductTable