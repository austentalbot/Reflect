var React = window.React = require('react');
var R = React.createElement;
var GoalInputForm = require('./GoalInputForm.jsx');
var GoalStore = require('../stores/GoalStore.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var getGoalState = function() {
  return {
    goalCount: GoalStore.getGoalCount()
  };
};

var MainApp = module.exports = React.createClass({
  getInitialState: function() {
    GoalStore.addChangeListener(this._onChange);
    return getGoalState();
  },
  _onChange: function() {
    console.log('change was emitted');
    this.setState(getGoalState());
  },
  render: function() {
    return R('div', {
      children: [
        R('h1', {
          className: 'reflectTitle'
        }, 'Reflect'),
        R(GoalInputForm, {goalCount: this.state.goalCount})
      ]
    });
  }
});
