var React = window.React = require('react');
var R = React.createElement;
var MainGoalCreation = require('./components/MainGoalCreation.jsx');
var MainGoalReview = require('./components/MainGoalReview.jsx');
var MainProgressDetail = require('./components/MainProgressDetail.jsx');
var GoalStore = require('./stores/GoalStore.js');
var Navigation = require('./components/Navigation.jsx');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;

var App = React.createClass({
  render: function() {
    return R(Navigation, {page: RouteHandler});
    // return R(RouteHandler);
  }
});

var routes = (
  R(Route, {
    handler: App,
    className: 'route',
    children: [
      R(DefaultRoute, {handler: MainGoalCreation}),
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

