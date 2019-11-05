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
            words: this.props.inputWords, // states инициализированы
        };
    },

    processAction: function(EO) {
        // Функция считывает состояние признаков в states, установленных при обработке событий на контролах.
        // Согласно признаков выполняются необходимые операции (фильтрация, сортировка) и обновляется states
        var rebuildWordList = () => {
            var workingWordArr = this.state.filterStr 
                ? this.props.inputWords.filter(word => new RegExp(this.state.filterStr).test(word)) // фильтруем список
                : this.props.inputWords.filter(el => true); // либо копируем полностью исходный массив из props
            
            if (this.state.sortFlag) // сортируем список, если необходимо
                //workingWordArr.sort((currWord, nextWord) => currWord > nextWord); // FIREFOX ONLY
                workingWordArr.sort((currWord, nextWord) => {
                    if (currWord.toLowerCase() > nextWord.toLowerCase())
                        return 1;
                    else if (currWord.toLowerCase() < nextWord.toLowerCase())
                        return -1;
                    return 0;
                });
            
            this.setState( {words: workingWordArr} );
        };
        
        switch (EO.target.name) {
            case "sort":
                this.setState( {sortFlag: EO.target.checked}, rebuildWordList );
                console.log(`Сортировка в состоянии ${EO.target.checked ? "включена" : "выключена"}`);
                break;
            case "filter":
                this.setState( {filterStr: EO.target.value}, rebuildWordList );
                console.log(`Теперь фильтр такой: ${EO.target.value}`);
                break;
            case "reset":
                this.setState( this.getInitialState(), rebuildWordList );
                console.log("Сброс к начальному состоянию");
                break;
        }

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
                    name: "sort",
                    className: "sortOpt",
                    checked: this.state.sortFlag,
                    onChange: this.processAction,
                }),
                React.DOM.input({
                    type: "text",
                    name: "filter",
                    className: "filterString",
                    value: this.state.filterStr,
                    onChange: this.processAction
                }),
                React.DOM.input({
                    type: "button",
                    name: "reset",
                    className: "resetBtn",
                    defaultValue: "Сброс",
                    onClick: this.processAction,
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
