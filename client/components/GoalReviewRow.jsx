var React = window.React = require('react');
var R = React.createElement;
var GoalStore = require('../stores/GoalStore.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');

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
            R('input', {
              className: 'goal-review-row-detail-input',
              type: 'text'
            })
          ]
        }),
        R('div', {
          className: 'goal-review-row-detail',
          children: [
            R('div', {
              className: 'goal-review-row-detail-question'
            }, 'What is blocking you from your goal?'),
            R('input', {
              className: 'goal-review-row-detail-input',
              type: 'text'
            })
          ]
        }),
        R('div', {
          className: 'goal-review-row-detail',
          children: [
            R('div', {
              className: 'goal-review-row-detail-question'
            }, 'Are you on track to meet your goal?'),
            R('input', {
              className: 'goal-review-row-detail-input',
              type: 'text'
            })
          ]
        })

      );
    }

    return R('div', {
      className: 'goal-review-row',
      children: rowContents
    });
  }
});
