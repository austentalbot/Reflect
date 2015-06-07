var React = window.React = require('react');
var R = React.createElement;
var GoalStore = require('../stores/GoalStore.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var GoalProgressRow = require('./GoalProgressRow.jsx');

var getGoalState = function() {
  return {
    goals: GoalStore.getFirebase()
  };
};

var MainProgressDetail = module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return getGoalState();
  },
  componentWillMount: function() {
    GoalStore.addFirebaseGoalChangeListener(this._onGoalProgressChange);
  },
  componentWillUnmount: function() {
    GoalStore.removeFirebaseGoalChangeListener(this._onGoalProgressChange);
  },
  _onGoalProgressChange: function() {
    console.log('change was emitted');
    this.setState(getGoalState());
  },
  render: function() {
    var that = this;
    var firebase = that.state.goals.map(function(goal, id) {
      return R(GoalProgressRow, {key: id, goal: goal});
    });

    return R('div', {
      children: [
        R('h2', {}, 'Goal progress:'),
        R('div', {
          children: firebase
        })
      ]
    });
  }
});
