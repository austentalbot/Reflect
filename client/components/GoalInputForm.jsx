var React = require('react');
var R = React.createElement;
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var GoalInput = require('./GoalInput.jsx');
var ConvertCoords = window.convertCoords = require('../helpers/ConvertCoords.js');
var reqwest = require('reqwest');

var GoalInputForm = module.exports = React.createClass({
  onAddInputClick: function() {
    AppDispatcher.handleViewAction({
      actionType: 'INCREMENT_COORD_COUNT'
    });
  },
  render: function() {
    var that = this;
    var addButton = R('button', {
      onClick: this.onAddInputClick
    }, 'Add goal');

    var inputs = [];
    for (var i = 0; i<that.props.goalCount; i++) {
      inputs.push(R(GoalInput, {idNum: i}));
    }
    return R('div', {
      className: 'goalInputForm',
      children: [
        addButton,
      ].concat(inputs)
    });
  }
});
