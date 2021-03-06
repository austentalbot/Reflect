var React = window.React = require('react');
var R = React.createElement;
var GoalInputForm = require('./GoalInputForm.jsx');
var GoalStore = require('../stores/GoalStore.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var Login = module.exports = React.createClass({
  onLoginClick: function() {
    console.log('login');
    AppDispatcher.handleViewAction({
      actionType: 'LOGIN'
    });
  },
  onLogoutClick: function() {
    console.log('logout');
    AppDispatcher.handleViewAction({
      actionType: 'LOGOUT'
    });
  },
  render: function() {
    var loginButton = R('button', {
      onClick: this.onLoginClick
    }, 'Login');
    var logoutButton = R('button', {
      onClick: this.onLogoutClick
    }, 'Logout');
    return R('div', {
      className: 'login',
      children: [
        loginButton,
        logoutButton
      ]
    });
  }
});
