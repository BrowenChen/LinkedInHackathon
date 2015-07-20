var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require('./schemas');
var restaurantJson = require('./restaurants.json');

module.exports = (function() {
	restaurantJson.forEach(function(item, index) {
		var menu = {
			items: []
		}

		item.menu_items.forEach(function(menuItem, index) {
			menu.items.push({
				price: menuItem.price || "",
				overallRating: Math.random(),
				name: menuItem.name,
				posReviews: [{text:"Yummy!", time:"Just now."}],
				negReviews: [{text:"Terrible!", time:"Yesterday."}]
			});
		});

		var newRestaurant = new models.Restaurant({
			name: item.name,
			location: item.location,
			websiteUrl: item.websiteUrl,
			yelpRanking: Math.random(0, 5),
			numReviews: item.numReviews,
			menu: JSON.stringify(menu),
			dateLastReviewed: new Date()
		});

		newRestaurant.save(function(err, newRestaurant) {
		    if (err) {
		      console.log('Error in saving: ' + err);
		    } else {
		      console.log("Successfully saved.");
		    }
	 	});
	});
})();