var React = window.React = require('react');
var R = React.createElement;
var MainGoalCreation = require('./components/MainGoalCreation.jsx');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function() {
    return R(RouteHandler);
  }
});

var routes = (
  R(Route, {
    handler: App,
    children: [
      R(Route, { path: '/', handler: MainGoalCreation })
    ]
  })
);

Router.run(routes, Router.HashLocation, function(Root) {
  React.render(R(Root), document.getElementById('react'));
});

