var React = window.React = require('react');
var R = React.createElement;
var GoalStore = require('../stores/GoalStore.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var GoalReviewRow = require('./GoalReviewRow.jsx');
var getGoalState = function() {
  return {
    goals: GoalStore.getFirebase()
  };
};

var MainGoalReview = module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return getGoalState();
  },
  componentWillMount: function() {
    GoalStore.addFirebaseGoalChangeListener(this._onGoalReviewChange);
  },
  componentWillUnmount: function() {
    GoalStore.removeFirebaseGoalChangeListener(this._onGoalReviewChange);
  },
  _onGoalReviewChange: function() {
    console.log('change was emitted');
    this.setState(getGoalState());
  },
  render: function() {
    var that = this;
    var firebase = that.state.goals.map(function(goal, id) {
      return R(GoalReviewRow, {key: id, goal: goal});
    });

    return R('div', {
      className: 'main-app',
      children: [
        R('h4', {}, 'Update the progress on your goals'),
        R('div', {
          children: firebase
        })
      ]
    });
  }
});
