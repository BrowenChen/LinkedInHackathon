var Locu = (function ($, undefined) {
  //the returned (public) object
  var pub                 = {},

      //the locu url constants for each endpoint
      _urls               = {
        RESTAURANTS: 'https://api.locu.com/v2/venue/search',
        BASE: 'https://api.locu.com/'
      },

      //the additional args for getting restaurants
      _locuRestaurantArgs = {
        'region': 'CA',
        'locality': 'Mountain View',
        'has_menu': 'TRUE'
      },

      /**
       * Used to make a endpoint call to the Locu API
       * @param url - the locu endpoint url
       * @param queryParams - additional query parameters to be added (api_key already included)
       * @returns {Promise}
       */
      _locuGet            = function (url, queryParams) {
        var ajaxArgs    = {
              crossDomain: true,
              dataType: 'jsonp',
              data: {
                'api_key': '4d9efaa10287905ca8582549584a5ebfcd142808'
              }
            },
            queryParams = queryParams || {};

        Object.keys(queryParams).forEach(function (key) {
          ajaxArgs.data[key] = queryParams[key];
        });

        return $.ajax(url, ajaxArgs);
      },

      _locuPost           = function (url, queryParams) {
        var data        = {
              'api_key': '4d9efaa10287905ca8582549584a5ebfcd142808',
              'fields': ['name', 'location', 'contact', 'website_url', 'menus', 'categories'],
              'venue_queries': [
                {
                  'menus': {"$present": true},
                  "location": {
                    "locality": "Mountain View"
                  },
                  'categories': 'restaurant'
                }
              ]
            },
            queryParams = queryParams || {};

        Object.keys(queryParams).forEach(function (key) {
          data[key] = queryParams[key];
        });

        return $.post(url, JSON.stringify(data));
      };


  /**
   * Returns a promise containing the restaurants object
   * @returns {Promise}
   */
  pub.getRestaurants = function () {
    return _locuPost(_urls.RESTAURANTS);
  };

  /**
   * Returns a promise containing the menu object
   * @param restaurant - the restaurant object
   * @returns {Promise}
   */
  pub.getMenu = function (restaurant) {
    return _locuGet(_urls.BASE + restaurant.resource_uri);
  };

  /**
   * Parses a menu object and returns an array of menu items
   * @param menu
   * @returns {Array}
   */
  pub.getMenuItems = function (menus) {
    var menuItems = [];
    menus.forEach(function (menu) {
      menu.sections.forEach(function (section) {
        section.subsections.forEach(function (subsection) {
          subsection.contents.forEach(function (menuItem) {
            menuItems.push(menuItem);
          });
        });
      });
    });

    return menuItems;
  };

  return pub;
})
(jQuery);