// Generated by CoffeeScript 1.6.2
(function() {
  var Add, App, Tiger,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tiger = require('/lib/tiger');

  Add = require('/controllers/add');

  App = (function(_super) {
    __extends(App, _super);

    App.prototype.logPrefix = '(Todo:App)';

    App.prototype.indicies = {
      'All': 0,
      'Active': 1,
      'Done': 2
    };

    App.prototype.addTodoItem = function() {
      return (new Add(this.Store)).render();
    };

    App.prototype.events = {
      'click header.addView': 'addTodoItem',
      'click menu': 'filter'
    };

    function App() {
      this.debug('Creating...');
      this.Store = require('/models/todo');
      this.View = require('/views/app');
      this.view = new this.View;
      App.__super__.constructor.apply(this, arguments);
      this.Store.bind('refresh change', this.proxy(this.renderItems)).bind('error', this.handleError).bindTigerDB();
      this.render();
    }

    App.prototype.render = function() {
      this.view.open();
      return this.Store.fetch();
    };

    App.prototype.filter = function(e) {
      var tasks, whereIndex;

      if (!e.source.title) {
        return;
      }
      whereIndex = this.indicies[e.source.title];
      if (!whereIndex) {
        return this.renderItems();
      } else {
        tasks = this.Store.filter({
          done: whereIndex !== 1
        });
        return this.view.renderTasks(tasks);
      }
    };

    App.prototype.renderItems = function() {
      return this.view.renderTasks(this.Store.all());
    };

    App.prototype.handleError = function(record, msg) {
      return alert("Update failed for record " + record.id + ": " + msg);
    };

    return App;

  })(Tiger.Controller);

  new App();

}).call(this);
