var FilterableSortableList = React.createClass({
    displayName: "FilteredSortableList",

    propTypes: {
        inputWords: React.PropTypes.array.isRequired,
        startSortFlag: React.PropTypes.bool
    },

    getInitialState: function() {
        keyCounter = 0;
        return {
            filterStr: "",
            sortFlag: this.props.startSortFlag || false,
            words: this.props.inputWords.map(v => ({
                str: v,
                code: keyCounter++
            }))
        };
    },

    update: function(EO) {
        console.log("Теперь фильтр такой: " + EO.target.value);
        this.setState({ filterStr: EO.target.value });
    },

    sortWords: function(EO) {
        this.setState({ sortFlag: !this.state.sortFlag });
        console.log(
            "Сортировка " + (EO.target.checked ? "включена" : "выключена")
        );
    },

    reset: function(EO) {
        console.log("Сброс к начальному состоянию");
        this.setState(this.getInitialState());
    },

    render: function() {
        var wordsList = this.state.words;

        if (this.state.sortFlag)
            wordsList.sort((currWordH, nextWordH) => currWordH.str > nextWordH.str);

        if (this.state.filterStr) {
            var re = new RegExp(this.state.filterStr);
            wordsList = wordsList.filter(currWordH => re.test(currWordH.str));
        }

        var optionElems = wordsList.map(v =>
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
                    onChange: this.update
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
