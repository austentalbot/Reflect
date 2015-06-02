var React = window.React = require('react');
var R = React.createElement;
var GoalStore = require('../stores/GoalStore.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var maxLength = 200;

var GoalReviewProgressBar = module.exports = React.createClass({
  getInitialState: function() {
    return {
    }
  },
  onProgressClick: function(e) {
    var rect = this.getDOMNode().getBoundingClientRect();
    var score = parseInt(((e.pageX - rect.left)/rect.width)*100);
    console.log('score', score);
  },
  render: function() {
    var that = this;
    
    return R('div', {
      className: 'goal-review-progress-bar',
      onClick: this.onProgressClick
    });
  }
});
