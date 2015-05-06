var React = require('react');
var R = React.createElement;
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var GoalInput = require('./GoalInput.jsx');
var reqwest = require('reqwest');

var GoalInputForm = module.exports = React.createClass({
  onAddInputClick: function() {
    AppDispatcher.handleViewAction({
      actionType: 'INCREMENT_COORD_COUNT'
    });
  },
  onSubmitClick: function() {
    console.log('submit!');
  },
  render: function() {
    var that = this;
    var addButton = R('button', {
      className: 'addGoalButton',
      onClick: this.onAddInputClick
    }, 'Add goal');

    var submitButton = R('button', {
      className: 'submitGoalsButton button-primary',
      onClick: this.onSubmitInputClick
    }, 'Submit goals');

    var inputs = [];
    for (var i = 0; i<that.props.goalCount; i++) {
      inputs.push(R(GoalInput, {idNum: i}));
    }
    return R('div', {
      className: 'goalInputForm',
      children: [
        addButton,
        submitButton
      ].concat(inputs)
    });
  }
});
