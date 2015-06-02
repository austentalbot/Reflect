var React = window.React = require('react');
var R = React.createElement;
var GoalStore = require('../stores/GoalStore.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var progressWidth = 350;
var indicatorDiameter = 26;
var GoalReviewProgressBar = module.exports = React.createClass({
  getInitialState: function() {
    return {
      x: .5
    }
  },
  onProgressClick: function(e) {
    var rect = this.getDOMNode().getBoundingClientRect();
    var score = parseInt(((e.pageX - rect.left)/rect.width)*100);
    console.log('score', score);
    this.setState({ x: score/100 })
  },
  render: function() {
    var that = this;

    var dotStyle = {
      left: this.state.x * (progressWidth - indicatorDiameter + 2) + 'px',
      width: indicatorDiameter + 'px'
    };
    console.log('style', dotStyle);
    var dot = R('div', {
      className: 'goal-review-progress-bar-indicator',
      style: dotStyle
    }, ' ');
    
    return R('div', {
      className: 'goal-review-progress-bar',
      style: { width: progressWidth },
      onClick: this.onProgressClick,
      children: [dot]
    });
  }
});
