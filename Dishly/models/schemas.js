var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menu = {
	items: [
		{
			price: "",
			overallRating: "",
			name: "",
			posReviews: [{text:"", time:""}],
			negReviews: [{text:"", time:""}]
		}
	]
}

var RestaurantSchema = new Schema({
	name: String,
	location: String,
	websiteUrl: String,
	yelpRating: String,
	numReviews: Number,
	menu: String,
	dateLastReviewed: Date
});

// var ItemSchema = new Schema({
// 	price: String,
// 	overallRating: Number,
// 	name: String,
// 	posReviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
// 	negReviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
// });

// var MenuSchema = new Schema({
// 	items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}]
// });

// var ReviewSchema = new Schema({
// 	text: String,
// 	time: Date
// });

exports.Restaurant = mongoose.model('Restaurant', RestaurantSchema);
// exports.Item = mongoose.model('Item', ItemSchema);
// exports.Menu = mongoose.model('Menu', MenuSchema);
// exports.Review = mongoose.model('Review', ReviewSchema);