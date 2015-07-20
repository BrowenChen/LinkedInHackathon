define([
  'jquery',
  'backbone',
  'underscore',
  'globals',
  'views/dashboard',
  'views/nav',
  'views/home',
  'views/restaurant'
],
function( $, Backbone, _, Globals, dashboard, nav, home, restaurant) {
  var Router = Backbone.Router.extend({
    initialize: function(){


      $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
        options.crossDomain ={
            crossDomain: true
        };
        options.xhrFields = {
            withCredentials: false
        };
      });

      var options = {};
      this.dashboardView  = dashboard;
      this.navView        = nav;
      this.homeView       = home;
      this.restaurantView = restaurant;
      options.view        = "nav";
      Backbone.history.start();
      this.dashboardView.render(options);
    },
    routes: {
      '': 'home',
      'restaurant/:id': 'restaurant',
    },
    'home': function(){
      var options = {};
      options.view = "home";
      this.dashboardView.render(options);

    },
    'restaurant': function(id){
      var options = {};
      options.view = "restaurant";
      options.data = {};
      options.data.id = id;
      this.dashboardView.render(options);
    }
  });
  return Router;
});