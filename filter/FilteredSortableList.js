var FilteredSortableList = React.createClass({

    displayName: 'FilteredSortableList',

    propTypes: {
        inputWords: React.PropTypes.array.isRequired,
        startSortFlag: React.PropTypes.bool,
    },

    getInitialState: function() {
        return {
            placeholder: 'Всё под контролем',
            sortFlag: this.props.startSortFlag,
            words: this.props.inputWords,
        };
    },


    update: function(EO) {
        console.log('Теперь фильтр такой: ' + EO.target.value);
        this.setState( {placeholder: EO.target.value} );
    },

    sortWords: function(EO) {
        this.setState( {sortFlag: !this.state.sortFlag} );
        console.log('Фильтрация: ' + (EO.target.checked ? 'включена' : 'выключена') );
    },

    reset: function(EO) {
        console.log('Сброс к начальному состоянию');
        // this.setState( {placeholder: ''} );
        this.setState( this.getInitialState() );
    },

    render: function() {

        var optionElems = this.state.words.map( v =>
            React.DOM.option({key:v.code, value:v.text}, v.text),
        );

        if (this.state.sortFlag)
            optionElems.sort( (item1, item2) => item1.props.value > item2.props.value );
        
        return React.DOM.div( {className:'AwesomeList'},
            React.DOM.div( {className:'controlsGroup'},  
                React.DOM.input( {type: 'checkbox', name: 'sorting', className: 'sortOpt', checked: this.state.sortFlag||false,
                    onChange: this.sortWords} ),
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