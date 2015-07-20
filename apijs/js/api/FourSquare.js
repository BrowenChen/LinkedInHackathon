var FourSquare = (function ($, undefined) {
  //the returned (public) object
  var pub            = {},

      _oauthKeys     = {
        CLIENT_ID: 'JPYSWNUCXEDDCIQJZCF0RZCXPDSP4WJ5UTGFGGNNTLHXQA1U',
        CLIENT_SECRET: 'EEQZ5A5SQ3JYSLHH20AV5OMMUMRKRF0Y4HCJKVFTPROUUMP0',
        VERSION: '20150717'
      },

      //the locu url constants for each endpoint
      _urls          = {
        RESTAURANTS: 'https://api.foursquare.com/v2/venues/search',
        BASE: 'https://api.foursquare.com/v2/venues/',
        TIPS: function (restaurantId) {
          return this.BASE + restaurantId + '/tips/';
        },
        MENU: function (restaurantId) {
          return this.BASE + restaurantId + '/menu/';
        }
      },

      /**
       * Used to make a endpoint call to the FourSquare API
       * @param url - the FourSquare endpoint url
       * @param queryParams - additional query parameters to be added (api_key already included)
       * @returns {Promise}
       */
      _fourSquareGet = function (url, queryParams) {
        var ajaxArgs    = {
              crossDomain: true,
              dataType: 'jsonp',
              data: {
                'client_id': _oauthKeys.CLIENT_ID,
                'client_secret': _oauthKeys.CLIENT_SECRET,
                'v': _oauthKeys.VERSION
              }
            },
            queryParams = queryParams || {};

        Object.keys(queryParams).forEach(function (key) {
          ajaxArgs.data[key] = queryParams[key];
        });

        return $.ajax(url, ajaxArgs);
      };


  /**
   *
   * @returns {Promise}
   */
  pub.getRestaurants = function () {
    return _fourSquareGet(_urls.RESTAURANTS, {
      'near': 'Mountain View, CA',
      'limit': 50,
      'categoryId': '4d4b7105d754a06374d81259'
    });
  };

  /**
   *
   * @param restaurant
   * @returns {Promise}
   */
  pub.getRestaurantReviews = function (restaurant) {
    return _fourSquareGet(_urls.TIPS(restaurant.id), {
      limit: 500
    });
  };

  /**
   *
   * @param restaurant
   * @returns {Promise}
   */
  pub.getRestaurantMenu = function (restaurant) {
    return _fourSquareGet(_urls.MENU(restaurant.id));
  };

  return pub;
})(jQuery);