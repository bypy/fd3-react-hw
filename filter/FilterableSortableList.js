var FilterableSortableList = React.createClass({
    displayName: "FilteredSortableList",

    propTypes: {
        inputWords: React.PropTypes.array.isRequired,
        startSortFlag: React.PropTypes.bool
    },

    origlWordsH: null,

    getInitialState: function() {
        keyCounter = 0;
        this.origlWordsH = this.props.inputWords.map(v => ({
            str: v,
            code: keyCounter++
        }));
        return {
            filterStr: "",
            sortFlag: this.props.startSortFlag || false,
            words: this.origlWordsH,
        };
    },

    filterWords: function(EO) {
        var filterChars = EO.target.value;
        console.log("Теперь фильтр такой: " + filterChars);
        this.setState({ filterStr: filterChars });
        if (filterChars !== '') {
            var re = new RegExp(filterChars);
            this.setState( (prevState, props) => { 
                return { words: prevState.words.filter(currWordH => re.test(currWordH.str)) };
            });
        }
    },

    sortWords: function(EO) {
        var isChecked = EO.target.checked;
        this.setState( ( prevState, props ) => {
            console.log(
                "Сортировка была " + (prevState.sortFlag ? "включена" : "выключена") +
                ". Стала " + (isChecked ? "включена" : "выключена")
            );
            return { sortFlag: isChecked };
        });
        this.setState( (prevState, props) => {
            if (isChecked) {
                return { words: prevState.words.sort( (currWordH, nextWordH) => currWordH.str > nextWordH.str) }; 
            } else {
                return { words: this.origlWordsH };
            }
        });
    },

    reset: function(EO) {
        console.log("Сброс к начальному состоянию");
        this.setState(this.getInitialState());
    },

    render: function() {

        var optionElems = this.state.words.map(v =>
            React.DOM.option(
                { key: v.code, value: v.str.replace(/[\s\?\!\@\#\$\%\^\&\*\\\/\,\.\(\)<\>]/g, '') },
                v.str
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
