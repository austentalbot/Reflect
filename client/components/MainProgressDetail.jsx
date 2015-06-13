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
    var progressHistory = that.state.goals.map(function(goal, id) {
      return R(GoalProgressRow, {key: id, goal: goal});
    });

    var progress = {
      open: 0,
      archived: 0,
      complete: 0
    };

    that.state.goals.forEach(function(goal) {
      var status = goal.val().status;
      progress[status]++;
    });

    var goalStats = R('div', {
      className: 'goal-progress-goal-stats',
      children: [
        'Open goals: ' + progress.open,
        'Completed goals: ' + progress.complete,
        'Archived goals: ' + progress.archived
      ]
    });

    return R('div', {
      className: 'main-app',
      children: [
        R('h4', {}, 'Review the timeline of your progress'),
        goalStats,
        R('div', {
          children: progressHistory
        })
      ]
    });
  }
});
