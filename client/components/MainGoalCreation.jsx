var React = window.React = require('react');
var R = React.createElement;
var GoalInputForm = require('./GoalInputForm.jsx');
var GoalStore = require('../stores/GoalStore.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var getGoalState = function() {
  return {
    goalCount: GoalStore.getGoalCount(),
    firebase: GoalStore.getFirebase()
  };
};

var MainGoalCreation = module.exports = React.createClass({
  getInitialState: function() {
    return getGoalState();
  },
  componentWillMount: function() {
    GoalStore.addGoalCountChangeListener(this._onGoalCreationChange);
  },
  componentWillUnmount: function() {
    GoalStore.removeGoalCountChangeListener(this._onGoalCreationChange);
  },
  _onGoalCreationChange: function() {
    console.log('change was emitted');
    this.setState(getGoalState());
  },
  render: function() {
    return R('div', {
      className: 'main-app',
      children: [
        R(GoalInputForm, {
          goalCount: this.state.goalCount,
          firebase: this.state.firebase
        })
      ]
    });
  }
});
