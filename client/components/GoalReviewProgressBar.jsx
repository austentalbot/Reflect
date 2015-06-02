var React = window.React = require('react');
var R = React.createElement;
var GoalStore = require('../stores/GoalStore.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var width = 350;
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

    // xcxc need to update positioning
    var dotStyle = {
      left: this.state.x * width + 'px'
    };
    console.log('style', dotStyle);
    var dot = R('div', {
      className: 'goal-review-progress-bar-indicator',
      style: dotStyle
    }, ' ');
    
    return R('div', {
      className: 'goal-review-progress-bar',
      style: { width: width },
      onClick: this.onProgressClick,
      children: [dot]
    });
  }
});
