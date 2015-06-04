var React = window.React = require('react');
var R = React.createElement;
var GoalStore = require('../stores/GoalStore.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var GoalProgressEntry = module.exports = React.createClass({
  render: function() {
    var story = this.props.story;

    return R('div', {
      className: 'goal-progress-entry',
      children: [
        R('div', {}, 'Steps: ' + story.steps),
        R('div', {}, 'Blockers: ' + story.blockers),
        R('div', {}, 'Score: ' + story.score)
      ]
    });
  }
});
