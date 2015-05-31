var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var GoalConstants = require('../constants/GoalConstants.js');

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
  emitChange: function() {
    this.emit('change');
  },
  addChangeListener: function(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

// Register dispatcher callback
AppDispatcher.register(function(payload) {
  var action = payload.action;
  // Define what to do for certain actions
  if (action.actionType === 'LOAD_GOALS') {
    loadGoals(action.data);
    // If action was acted upon, emit change event
    GoalStore.emitChange();
  } else if (action.actionType === 'INCREMENT_GOAL_COUNT') {
    GoalStore.incrementGoalCount();
    GoalStore.emitChange();
  } else if (action.actionType === 'RESET_GOAL_COUNT') {
    GoalStore.resetGoalCount();
    GoalStore.emitChange();
  } else if (action.actionType === 'SUBMIT_GOALS') {
    console.log('submitting goals!');
    for (var i = 0; i < _goalCount; i++) {
      console.log(i);
      console.log(document.getElementById(GoalConstants.GOAL_ID_PREFIX + i).value);
    }
  }
  
  return true;
});

module.exports = GoalStore;
