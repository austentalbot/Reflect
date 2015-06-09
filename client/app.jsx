var React = window.React = require('react');
var R = React.createElement;
var MainGoalCreation = require('./components/MainGoalCreation.jsx');
var MainGoalReview = require('./components/MainGoalReview.jsx');
var MainProgressDetail = require('./components/MainProgressDetail.jsx');
var Login = require('./components/Login.jsx');
var GoalStore = require('./stores/GoalStore.js');
var Navigation = require('./components/Navigation.jsx');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;

var getLoginState = function() {
  return {
    loggedIn: GoalStore.getLoginStatus()
  };
}

var App = React.createClass({
  getInitialState: function() {
    return getLoginState();
  },
  componentWillMount: function() {
    GoalStore.addLoginChangeListener(this._onLoginChange);
  },
  componentWillUnmount: function() {
    GoalStore.removeLOginChangeListener(this._onLoginChange);
  },
  _onLoginChange: function() {
    console.log('login change was emitted');
    this.setState(getLoginState());
  },
  render: function() {
    console.log('login state', this.state);
    if (this.state.loggedIn) {
      return R(Navigation, {page: RouteHandler});
    } else {
      return R(Login);      
    }
  }
});

var routes = (
  R(Route, {
    handler: App,
    className: 'route',
    children: [
      R(DefaultRoute, {handler: MainGoalCreation}),
      R(Route, { path: 'login', handler: Login }),
      R(Route, { path: 'home', handler: MainGoalCreation }),
      R(Route, { path: 'goals', handler: MainGoalReview }),
      R(Route, { path: 'progress', handler: MainProgressDetail })      
    ]
  })
);

Router.run(routes, Router.HashLocation, function(Root, state) {
  React.render(R(Root), document.getElementById('react'));
  GoalStore.resetGoalCount();
});

