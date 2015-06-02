var React = window.React = require('react');
var R = React.createElement;
var GoalStore = require('../stores/GoalStore.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var GoalReviewProgressBar = require('./GoalReviewProgressBar.jsx');

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
  render: function() {
    var that = this;

    rowContents = [
      R('div', {
        className: 'goal-review-row-title',
        onClick: that.onOpenDetailsClick
      }, this.props.name)
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
            R(GoalReviewProgressBar, {})
          ]
        }),
        R('button', {
          className: 'goal-review-row-submit-detail',
          onClick: function() { console.log('submitting progress'); }
        }, 'Submit progress')

      );
    }

    return R('div', {
      className: 'goal-review-row',
      children: rowContents
    });
  }
});
