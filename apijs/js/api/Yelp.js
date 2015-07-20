var OAuthUtils = {
  NONCE_LENGTH: 32,
  generateNonce: function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < this.NONCE_LENGTH; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
};

var Yelp = (function ($, undefined) {
  //the returned (public) object
  var pub        = {},

      _oauthKeys = {
        CONSUMER: 'z_Lp8c3zdW9fvm89Wl269g',
        TOKEN: 'JbVb3_BQRiFuM8eAql3xK97xwd4UHAxV',
        TOKEN_SECRET: 'Bl5sV45K1-kugNs8ZZztwowsRI0'
      },

      //the locu url constants for each endpoint
      _urls      = {
        RESTAURANTS: 'https://http://api.yelp.com/v2/search/',
        BASE: 'https://http://api.yelp.com/v2/'
      },

      /**
       * Used to make a endpoint call to the Locu API
       * @param url - the locu endpoint url
       * @param queryParams - additional query parameters to be added (api_key already included)
       * @returns {Promise}
       */
      _yelpGet   = function (url, queryParams) {
        var ajaxArgs    = {
              crossDomain: true,
              dataType: 'jsonp',
              data: {
                'oauth_consumer_key': _oauthKeys.CONSUMER,
                'oauth_token': _oauthKeys.TOKEN,
                'oauth_signature_method': 'hmac-sha1',
                'oauth_signature': CryptoJS.SHA1(_oauthKeys.TOKEN_SECRET),
                'oauth_timestamp': (new Date()).toString(),
                'oauth_nonce': OAuthUtils.generateNonce()
              }
            },
            queryParams = queryParams || {};

        Object.keys(queryParams).forEach(function (key) {
          ajaxArgs.data[key] = queryParams[key];
        });

        return $.ajax(url, ajaxArgs);
      };


  pub.getRestaurant = function (name, location) {
    return _yelpGet(_urls.RESTAURANTS, {
      term: name,
      location: location,
      limit: 1
    });
  };

  pub.getRestaurantReviews = function (restuarantid) {
    return _yelpGet()
  };

})(jQuery);