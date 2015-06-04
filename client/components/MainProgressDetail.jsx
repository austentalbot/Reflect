var React = window.React = require('react');
var R = React.createElement;
var GoalStore = require('../stores/GoalStore.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');

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
    GoalStore.addFirebaseGoalChangeListener(this._onGoalReviewChange);
  },
  componentWillUnmount: function() {
    GoalStore.removeFirebaseGoalChangeListener(this._onGoalReviewChange);
  },
  _onGoalReviewChange: function() {
    console.log('change was emitted');
    this.setState(getGoalState());
  },
  onAddNewGoalClick: function() {
    console.log('add new goal');
    this.context.router.transitionTo('/home');
  },
  render: function() {
    var that = this;
    // var firebase = that.state.goals.map(function(goal, id) {
    //   return R(GoalReviewRow, {key: id, goal: goal});
    // });
    var addNewGoalButton = R('button', {
      onClick: that.onAddNewGoalClick
    }, 'Add new goal');

    // return R('div', {
    //   children: [
    //     R('h1', {
    //       className: 'reflectTitle'
    //     }, 'Reflect'),
    //     R('h2', {}, 'Goals:'),
    //     addNewGoalButton,
    //     R('div', {
    //       children: firebase
    //     })
    //   ]
    // });
    return addNewGoalButton
  }
});
