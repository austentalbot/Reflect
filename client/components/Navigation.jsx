var React = window.React = require('react');
var R = React.createElement;
var GoalStore = require('../stores/GoalStore.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var Navigation = module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  onAddNewGoalClick: function() {
    console.log('add new goal');
    this.context.router.transitionTo('/home');
  },
  onUpdateGoalProgressClick: function() {
    console.log('update goal progress');
    this.context.router.transitionTo('/goals');
  },
  onReviewGoalProgressClick: function() {
    console.log('review goal progress');
    this.context.router.transitionTo('/progress');
  },

  render: function() {
    var that = this;

    var addNewGoalButton = R('button', {
      onClick: that.onAddNewGoalClick
    }, 'Add new goal');

    var updateGoalProgressButton = R('button', {
      onClick: that.onUpdateGoalProgressClick
    }, 'Update goal progress');

    var reviewGoalProgressButton = R('button', {
      onClick: that.onReviewGoalProgressClick
    }, 'Review goal progress');

    console.log('this.props', this.props);

    return R('div', {
      className: 'main-app',
      children: [
        R('div', {
          className: 'navigation-pane',
          children: [
            addNewGoalButton,
            updateGoalProgressButton,
            reviewGoalProgressButton
          ]
        }),
        R(this.props.page)
      ]
    });
  }
});
