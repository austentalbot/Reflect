var React = window.React = require('react');
var R = React.createElement;
var GoalInputForm = require('./GoalInputForm.jsx');
var GoalStore = require('../stores/GoalStore.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');

//xcxc temp test for login
var Firebase = require('firebase');
var ref = new Firebase('https://reflectgoal.firebaseio.com/');

var getGoalState = function() {
  return {
    goalCount: GoalStore.getGoalCount(),
    firebase: GoalStore.getFirebase()
  };
};

var MainGoalCreation = module.exports = React.createClass({
  getInitialState: function() {
    return getGoalState();
  },
  componentWillMount: function() {
    GoalStore.addGoalCountChangeListener(this._onGoalCreationChange);
  },
  componentWillUnmount: function() {
    GoalStore.removeGoalCountChangeListener(this._onGoalCreationChange);
  },
  _onGoalCreationChange: function() {
    console.log('change was emitted');
    this.setState(getGoalState());
  },
  onLoginClick: function() {
    console.log('login');
    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  },
  render: function() {
    var loginButton = R('button', {
      onClick: this.onLoginClick
    }, 'Login');
    return R('div', {
      className: 'main-app',
      children: [
        loginButton,
        R(GoalInputForm, {
          goalCount: this.state.goalCount,
          firebase: this.state.firebase
        })
      ]
    });
  }
});
