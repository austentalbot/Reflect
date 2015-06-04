var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var GoalConstants = require('../constants/GoalConstants.js');
var Firebase = require('firebase');
var client_credentials = require('../client_credentials.js');

//internal array of goals
var _goals = [];
var _goalCount = 1;

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
  }
});

// set up firebase
// xcxc remove window.fire reference

var Fire = window.Fire = new Firebase(client_credentials.firebaseUrl);
var firebase = [];
Fire.on('child_added', function(data) {
  console.log('child_added', data);
  firebase.push(data);
  GoalStore.emitFirebaseGoalChange();
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
        Fire.push({ name: goal });
      }
    }
  }
  
  return true;
});

module.exports = GoalStore;
