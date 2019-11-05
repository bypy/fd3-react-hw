var FilterableSortableList = React.createClass({
    displayName: "FilteredSortableList",

    propTypes: {
        inputWords: React.PropTypes.array.isRequired,
        startSortFlag: React.PropTypes.bool
    },

    getInitialState: function() {
        return {
            filterStr: "",
            sortFlag: this.props.startSortFlag || false,
            words: this.props.inputWords,
        };
    },

    filterWords: function(EO) {
        var filterChars = EO.target.value;
        console.log("Теперь фильтр такой: " + filterChars);
        this.setState( {filterStr: filterChars} );
        if (filterChars) { // не пустая строка
            var re = new RegExp(filterChars);
            this.setState( {words: this.props.inputWords.filter(wordH => re.test(wordH.str))} );
        }
    },

    sortWords: function(EO) {
        var bufferArrayForSorting = [];
        var isChecked = EO.target.checked;
        console.log(`Сортировка в состоянии ${isChecked ? "включена" : "выключена"}`);
        this.setState( {sortFlag: isChecked} );
        if(isChecked){
            // bufferArrayForSorting = this.props.inputWords; // Так меняются пропсы после сортировки
            this.props.inputWords.forEach( el => bufferArrayForSorting.push(el) );
            bufferArrayForSorting.sort((currWord, nextWord) => currWord > nextWord);
            this.setState( {words: bufferArrayForSorting} );
        } else {
            this.setState( {words: this.props.inputWords} ); 
        }
    },

    reset: function(EO) {
        console.log("Сброс к начальному состоянию");
        this.setState(this.getInitialState());
    },

    render: function() {
        var keyCounter = 0;
        var optionElems = this.state.words.map( word => 
            React.DOM.option(
                { key: ++keyCounter, value: word.replace(/[\s\?\!\@\#\$\%\^\&\*\\\/\,\.\(\)<\>]/g, '') },
                word
            )
        );

        return React.DOM.div(
            { className: "AwesomeList" },
            React.DOM.div(
                { className: "controlsGroup" },
                React.DOM.input({
                    type: "checkbox",
                    name: "sorting",
                    className: "sortOpt",
                    checked: this.state.sortFlag,
                    onChange: this.sortWords
                }),
                React.DOM.input({
                    type: "text",
                    name: "filtering",
                    className: "filterString",
                    value: this.state.filterStr,
                    onChange: this.filterWords
                }),
                React.DOM.input({
                    type: "button",
                    className: "resetBtn",
                    defaultValue: "Сброс",
                    onClick: this.reset
                })
            ),
            React.DOM.div(
                { className: "viewGroup" },
                React.DOM.select(
                    { className: "wordsList", name: "wordsList", size: "6" },
                    optionElems
                )
            )
        );
    }
});
