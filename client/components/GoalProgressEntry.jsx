var React = window.React = require('react');
var R = React.createElement;
var GoalStore = require('../stores/GoalStore.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var GoalProgressEntry = module.exports = React.createClass({
  render: function() {
    var story = this.props.story;
    window.story = story;

    return R('div', {
      className: 'goal-progress-entry',
      children: [
      R('div', {
          children: [
            R('span', {
              className: 'goal-progress-entry-title'
            }, 'Date: '),
            R('span', {}, new Date(story.timestamp).toStrings)
          ]
        }),
        R('div', {
          children: [
            R('span', {
              className: 'goal-progress-entry-title'
            }, 'Steps: '),
            R('span', {}, story.steps)
          ]
        }),
        R('div', {
          children: [
            R('span', {
              className: 'goal-progress-entry-title'
            }, 'Blockers: '),
            R('span', {}, story.blockers)
          ]
        }),
        R('div', {
          children: [
            R('span', {
              className: 'goal-progress-entry-title'
            }, 'Score: '),
            R('span', {}, story.score)
          ]
        })
      ]
    });
  }
});
