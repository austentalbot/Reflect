var React = window.React = require('react');
var R = React.createElement;
var GoalStore = require('../stores/GoalStore.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var GoalProgressEntry = require('./GoalProgressEntry.jsx');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

var GoalProgressRow = module.exports = React.createClass({
  mixins: [ReactFire],
  getInitialState: function() {
    return {
      isOpen: false
    }
  },
  componentWillMount: function() {
    var firebaseUrl = this.props.goal.ref().child('updates').ref().toString();
    this.bindAsArray(new Firebase(firebaseUrl), 'updates');
  },
  onOpenDetailsClick: function() {
    this.setState({ isOpen: !this.state.isOpen })
  },
  render: function() {
    var that = this;

    rowContents = [
      R('div', {
        className: 'goal-row-button goal-progress-row-title',
        onClick: that.onOpenDetailsClick
      }, this.props.goal.val().name)
    ];

    var history = this.state.updates.map(function(story) {
      return R(GoalProgressEntry, {story: story});
    });

    if (history.length === 0) {
      history = ['Add an update to track your progress'];
    }

    var goalDescription = R('div', {
      className: 'goal-progress-goal-description'
    }, 'Status: ' + this.props.goal.val().status);

    if (this.state.isOpen) {
      rowContents.push(
        R('div', {
          className: 'goal-progress-row-detail',
          children: [
            goalDescription,
            history
          ]
        })
      );
    }

    return R('div', {
      className: 'goal-progress-row',
      children: rowContents
    });
  }
});
