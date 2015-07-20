define([
  'jquery',
  'underscore',
  'backbone',
  'globals',
  'events',
  'text!templates/nav.html',
], function($, _, Backbone, Globals, events, template){

  var Nav = Backbone.View.extend({
    el: '#control-board-1',
    SHOW_NAV_CLASS: 'open',
    initialize: function() {
      events.on('nav:render', this.render, this);
    },
    render: function(options) {
      var the_template = _.template( template );
      events.trigger("dashboard:renderSubView", {self: this, template: the_template, options: {}});
    },
  });
  return new Nav();
});