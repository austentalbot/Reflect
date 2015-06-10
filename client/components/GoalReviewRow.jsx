var React = window.React = require('react');
var R = React.createElement;
var GoalStore = require('../stores/GoalStore.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var GoalReviewProgressBar = require('./GoalReviewProgressBar.jsx');
var Firebase = require('firebase');

var maxLength = 200;

var GoalReviewRow = module.exports = React.createClass({
  getInitialState: function() {
    return {
      isOpen: false
    }
  },
  onOpenDetailsClick: function() {
    this.setState({ isOpen: !this.state.isOpen })
  },
  onSubmitProgressClick: function() {
    var goalSteps = document.getElementById('goal-steps-' + this.props.goal.key()).value.trim();
    var goalBlockers = document.getElementById('goal-blockers-' + this.props.goal.key()).value.trim();
    var validSubmit = goalSteps.length && goalBlockers.length && goalSteps.length <= maxLength && goalBlockers.length <= maxLength
    if (validSubmit) {
      var progress = {
        blockers: goalBlockers,
        steps: goalSteps,
        score: this.refs.progress_bar.state.x,
        timestamp: Firebase.ServerValue.TIMESTAMP
      };
      this.props.goal.ref().child('updates').push(progress);
      this.setState({ isOpen: false});
    }
  },
  onCompleteClick: function() {
    console.log('complete');
    // set status to complete
    this.props.goal.ref().update({'status': 'complete'});
  },
  onRemoveClick: function() {
    console.log('remove');
    // set status to archived
    this.props.goal.ref().update({'status': 'archived'});
  },
  render: function() {
    var that = this;

    var completeButton = R('button', {
      className: 'goal-review-row-complete',
      onClick: that.onCompleteClick
    }, '✓');

    var removeButton = R('button', {
      className: 'goal-review-row-remove',
      onClick: that.onRemoveClick
    }, '✕');

    rowContents = [
      R('div', {
        className: 'goal-review-row-main',
        children: [
          R('div', {
            className: 'goal-row-button goal-review-row-title',
            onClick: that.onOpenDetailsClick
          }, this.props.goal.val().name),
          completeButton,
          removeButton
        ]
      })
    ];

    if (this.state.isOpen) {
      rowContents.push(
        R('div', {
          className: 'goal-review-row-detail',
          children: [
            R('div', {
              className: 'goal-review-row-detail-question'
            }, 'What steps have you taken to meet your goal?'),
            R('textarea', {
              className: 'goal-review-row-detail-input',
              id: 'goal-steps-' + this.props.goal.key(),
              type: 'text',
              maxLength: maxLength,
              placeholder: 'Type up to ' + maxLength + ' characters'
            })
          ]
        }),
        R('div', {
          className: 'goal-review-row-detail',
          children: [
            R('div', {
              className: 'goal-review-row-detail-question'
            }, 'What is blocking you from your goal?'),
            R('textarea', {
              className: 'goal-review-row-detail-input',
              id: 'goal-blockers-' + this.props.goal.key(),
              type: 'text',
              maxLength: maxLength,
              placeholder: 'Type up to ' + maxLength + ' characters'
            })
          ]
        }),
        R('div', {
          className: 'goal-review-row-detail',
          children: [
            R('div', {
              className: 'goal-review-row-detail-question'
            }, 'How on track are you to meet your goal?'),
            R(GoalReviewProgressBar, {
              ref: 'progress_bar'
            })
          ]
        }),
        R('button', {
          className: 'goal-review-row-submit-detail',
          onClick: that.onSubmitProgressClick
        }, 'Submit progress')
      );
    }

    return R('div', {
      className: 'goal-review-row',
      children: rowContents
    });
  }
});
