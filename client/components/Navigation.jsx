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

    var addNewGoalButton = R('div', {
      className: 'div-button',
      onClick: that.onAddNewGoalClick
    }, 'Add goals');

    var updateGoalProgressButton = R('div', {
      className: 'div-button',
      onClick: that.onUpdateGoalProgressClick
    }, 'Update progress');

    var reviewGoalProgressButton = R('div', {
      className: 'div-button',
      onClick: that.onReviewGoalProgressClick
    }, 'Review progress');

    return R('div', {
      children: [
        R('h1', {
          className: 'top-bar'
        }, 'Reflect'),
        R('div', {
          className: 'navigation',
          children: [
            R('div', {
              className: 'navigation-side-bar',
              children: [
                addNewGoalButton,
                updateGoalProgressButton,
                reviewGoalProgressButton
              ]
            }),
            R(this.props.page)
          ]
        }),
      ]
    });
  }
});
