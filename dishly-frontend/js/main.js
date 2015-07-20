require.config({
  paths: {
    'jquery': "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min",
    'underscore': "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min",
    'backbone': '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min',
    'templates': '../templates',
    'globals': 'globals',
    'events': 'events',
    'amcharts': '//cdn.amcharts.com/lib/3/amcharts',
    'amcharts.serial': '//cdn.amcharts.com/lib/3/serial',

  },
  'shim': {
    'backbone': {
      'deps': ['jquery', 'underscore'],
      'exports': 'Backbone'
    },
    'underscore': {
      'exports': '_'
    },
    'amcharts.serial': {
      'deps': [ 'amcharts' ],
      'exports': 'AmCharts',
      init: function() {
        AmCharts.isReady = true;
      }
    }
  }
});

require([
  'underscore',
  'backbone',
  'app'
  ],
  function(_, Backbone, app){
    app.init();
});