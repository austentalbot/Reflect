var React = require('react');
var R = React.createElement;

var GoalInput = module.exports = React.createClass({
  render: function() {
    return R('div', {
      className: 'goalInput',
      children: [
        'Goal ' + this.props.idNum + ':',
        R('input', {
          className: 'goalInput',
          id: 'goal' + this.props.idNum,
          type: 'text',
          placeholder: 'What is your goal?'
        })
      ]
    });
  }
});
