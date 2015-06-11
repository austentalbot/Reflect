var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var GoalConstants = require('../constants/GoalConstants.js');
var Firebase = require('firebase');
var client_credentials = require('../client_credentials.js');

//internal array of goals
var _goals = [];
var _goalCount = 1;
var _loggedIn = false;

// Method to load goals from action data
function loadGoals(data) {
  _goals = data;
}

// Merge our store with Node's Event Emitter
var GoalStore = assign({}, EventEmitter.prototype, {
  incrementGoalCount: function() {
    _goalCount++;
  },
  decrementGoalCount: function() {
    _goalCount--;
  },
  resetGoalCount: function() {
    _goalCount = 1;
  },
  getGoals: function() {
    return _goals;
  },
  getGoalCount: function() {
    return _goalCount;
  },
  getFirebase: function() {
    return firebase;
  },
  emitGoalCountChange: function() {
    this.emit('GOAL_COUNT_CHANGE');
  },
  addGoalCountChangeListener: function(callback) {
    this.on('GOAL_COUNT_CHANGE', callback);
  },
  removeGoalCountChangeListener: function(callback) {
    this.removeListener('GOAL_COUNT_CHANGE', callback);
  },
  emitFirebaseGoalChange: function() {
    this.emit('FIREBASE_GOAL_CHANGE');
  },
  addFirebaseGoalChangeListener: function(callback) {
    this.on('FIREBASE_GOAL_CHANGE', callback);
  },
  removeFirebaseGoalChangeListener: function(callback) {
    this.removeListener('FIREBASE_GOAL_CHANGE', callback);
  },
  emitLoginChange: function() {
    this.emit('LOGIN_CHANGE');
  },
  getLoginStatus: function() {
    return _loggedIn;
  },
  addLoginChangeListener: function(callback) {
    this.on('LOGIN_CHANGE', callback);
  },
  removeLoginChangeListener: function(callback) {
    this.removeListener('LOGIN_CHANGE', callback);
  }
});

// set up firebase
// xcxc remove window.fire reference

var Fire = window.Fire = new Firebase(client_credentials.firebaseUrl);
var FireUser, FireUserGoals;
var firebase = [];

Fire.onAuth(function(authData) {
  console.log('on auth callback', authData);
  firebase = [];
  if (authData) {
    _loggedIn = true;
    FireUser = window.FireUser = Fire.child(authData.uid);
    FireUser.once('value', function(val) {
      console.log('FireUser val', val);
      if (!val.val()) {
        FireUser.set({
          displayName: authData.google.displayName,
          email: authData.google.email
        });
      }
      FireUserGoals = window.FireUserGoals = FireUser.child('goals');
      FireUserGoals.on('child_added', function(data, prevChild) {
        console.log('child_added', data);
        console.log('prev child', prevChild);
        firebase.push(data);
        GoalStore.emitFirebaseGoalChange();
      });
    });
  } else {
    _loggedIn = false;
  }
  GoalStore.emitLoginChange();
});

// xcxc this is for testing remove later
// Fire.remove();


// Register dispatcher callback
AppDispatcher.register(function(payload) {
  var action = payload.action;
  // Define what to do for certain actions
  if (action.actionType === 'LOAD_GOALS') {
    loadGoals(action.data);
    // If action was acted upon, emit change event
    GoalStore.emitGoalCountChange();
  } else if (action.actionType === 'INCREMENT_GOAL_COUNT') {
    GoalStore.incrementGoalCount();
    GoalStore.emitGoalCountChange();
  } else if (action.actionType === 'RESET_GOAL_COUNT') {
    GoalStore.resetGoalCount();
    GoalStore.emitGoalCountChange();
  } else if (action.actionType === 'SUBMIT_GOALS') {
    console.log('submitting goals!');
    var goal;
    for (var i = 0; i < _goalCount; i++) {
      goal = document.getElementById(GoalConstants.GOAL_ID_PREFIX + i).value.trim();
      if (goal.length > 0) {
        FireUserGoals.push({ name: goal, status: 'open' });
      }
    }
    // reset goals after submitting
    GoalStore.resetGoalCount();
    document.getElementById(GoalConstants.GOAL_ID_PREFIX + 0).value = '';
    GoalStore.emitGoalCountChange();
  } else if (action.actionType === 'CLEAR_GOALS') {
    GoalStore.resetGoalCount();
    document.getElementById(GoalConstants.GOAL_ID_PREFIX + 0).value = '';
    GoalStore.emitGoalCountChange();
  } else if (action.actionType === 'LOGIN') {
    Fire.authWithOAuthPopup('google', function(error, authData) {
      if (error) {
        console.log('Login failed', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
      }
    }, {scope: 'email'});
  } else if (action.actionType === 'LOGOUT') {
    Fire.unauth();
  }
  
  return true;
});

module.exports = GoalStore;
