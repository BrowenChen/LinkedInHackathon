var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
var MahirData = {
	"FirstName": "Mahir",
	"LastName": "Shah",
	"Height": "5'11"
}

router.get('/api/restaurant', function(req, res, next) {
	mongoose.model('Restaurant').find({}, function(err, restaurants) {
		if (err) console.log(err)
		res.json(restaurants);
	});
});

router.get('/api/restaurant/:restaurantId', function(req, res, next) {
	objId = req.params.restaurantId;
	mongoose.model('Restaurant').find({"_id": objId}, function(err, restaurants) {
		if (err) console.log(err)
		res.json(restaurants);
	});
});

router.get('/api/restaurant/:restaurantId/:menuItemId', function(req, res, next) {
	res.json({"message":"This endpoint has yet to be implemented."});
});

module.exports = router;
