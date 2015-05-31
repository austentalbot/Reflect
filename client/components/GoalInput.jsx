var React = require('react');
var R = React.createElement;
var GoalConstants = require('../constants/GoalConstants.js');

var GoalInput = module.exports = React.createClass({
  render: function() {
    return R('div', {
      className: 'goalInputRow',
      children: [
        R('span', {
          className: 'goalInputTitle',
          children: [
            'Goal ' + (this.props.idNum + 1)
          ]
        }),
        R('input', {
          className: 'goalInput',
          id: GoalConstants.GOAL_ID_PREFIX + this.props.idNum,
          type: 'text',
          placeholder: 'What is your goal?'
        })
      ]
    });
  }
});
