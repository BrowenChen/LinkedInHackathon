define([
  'jquery',
  'underscore',
  'backbone',
  'globals',
  'events',
  'text!templates/home.html',
], function($, _, Backbone, Globals, events, template){

  var Restaurants = Backbone.Collection.extend({
    url: "http://localhost:3000/api/restaurant",
  })

  var Home = Backbone.View.extend({
    el: '#control-board-2',
    restaurants: new Restaurants,
    initialize: function() {
      events.on('home:render', this.render, this);
    },
    render: function(options) {
      var self = this;
      var the_template = _.template( template );
      this.restaurants.fetch({

        success: function() {
          events.trigger("dashboard:renderSubView", {self: self, template: the_template, options: {restaurants: self.restaurants.models}})
        },

      });
    },
  });
  return new Home();
});