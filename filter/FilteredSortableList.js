var FilteredSortableList = React.createClass({
    displayName: 'FilteredSortableList',

    propTypes: {
        listElements: React.PropTypes.array.isRequired,
    },

    render: function() {

        var optionElems = this.props.listElements.map( v =>
            React.DOM.option({key:v.code, value:v.text}, v.text),
        );

        return React.DOM.div( {className:'AwesomeList'},
            React.DOM.input( {type:'checkbox', defaultChecked:false, className:'SortOpt'} ),
            React.DOM.select( {className:'DataList', name:'DataList', size:'3', defaultValue:''}, optionElems ),

        );
    },
});