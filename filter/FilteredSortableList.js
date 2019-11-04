var FilteredSortableList = React.createClass({

    displayName: 'FilteredSortableList',

    propTypes: {
        words: React.PropTypes.array.isRequired,
    },

    getInitialState: function() {
        return { placeholder: 'Всё под контролем' };
    },

    update: function(EO) {
        console.log('Теперь фильтр такой: ' + EO.target.value);
        this.setState( {placeholder: EO.target.value} );
    },

    sortWords: function(EO) {
        console.log('Фильтрация: ' + (EO.target.checked ? 'включена' : 'выключена') );
    },

    reset: function(EO) {
        console.log('Поле фильтрации очищено');
        this.setState( {placeholder: ''} );
    },

    render: function() {

        var optionElems = this.props.words.map( v =>
            React.DOM.option({key:v.code, value:v.text}, v.text),
        );

        return React.DOM.div( {className:'AwesomeList'},
            React.DOM.div( {className:'controlsGroup'},  
                React.DOM.input( {type: 'checkbox', name: 'sorting', className: 'sortOpt', defaultChecked: false,
                    onClick: this.sortWords} ),
                React.DOM.input( {type: 'text', name: 'filtering', className: 'filterString', value: this.state.placeholder,
                    onChange: this.update} ),
                React.DOM.input( {type: 'button', className: 'resetBtn', defaultValue: 'Сброс',
                    onClick: this.reset} ),
            ),
            React.DOM.div( {className:'viewGroup'},
                React.DOM.select( {className: 'wordsList', name: 'wordsList', size: '5'}, optionElems ),
            ),
        );
    },
});