// This is the main entry point for the App
define([
  'router',

], function(router){
    console.log("starting app.")
    var init = function(){
      this.router = new router();
    };
    return {init: init};
});