var React = require('react');
var R = React.createElement;
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var GoalInput = require('./GoalInput.jsx');
var reqwest = require('reqwest');

var GoalInputForm = module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  onAddInputClick: function() {
    AppDispatcher.handleViewAction({
      actionType: 'INCREMENT_GOAL_COUNT'
    });
  },
  onSubmitClick: function() {
    var that = this;
    AppDispatcher.handleViewAction({
      actionType: 'SUBMIT_GOALS'
    });
  },
  onViewGoalsClick: function() {
    var that = this;
    this.context.router.transitionTo('/goals');
  },
  render: function() {
    var that = this;
    var addButton = R('button', {
      className: 'addGoalButton',
      onClick: this.onAddInputClick
    }, '+');

    var submitButton = R('button', {
      className: 'submitGoalsButton button-primary',
      onClick: this.onSubmitClick
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
