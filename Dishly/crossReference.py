import csv
import sys
from fuzzywuzzy import fuzz
from fuzzywuzzy import process

csv.field_size_limit(sys.maxsize)

restaurantsWithMenus = ["In-N-Out Burger", "DishDash", "Aqui Cal-Mex", "Red Rock Coffee", "Coupa Cafe", "BJ's Restaurant & Brewhouse", "Yard House", "Sushi Tomi", "Nola", "In-N-Out Burger", "Alice's Restaurant", "In-N-Out Burger", "Dave & Buster's", "Mikey's Smoked Meats & Deli", "Bamboo Garden", "Joy Sushi", "Subway", "ViVe Sol", "Sushi Tei", "Chef Xiu", "Steak Out", "Bajis Cafe", "Agave", "Ristorante Don Giovanni - Mountain View", "Rose Market", "Falafel & Kebab", "Cafe Baklava Mediterranean Grill", "El Calderon Restaurant", "McDonald's", "Cloud Cafe", "Amber India", "La Costena", "Roger's Deli & Donuts", "Mario's Italiano", "Red Rock Coffee", "KFC", "Le Petit Bistro", "Frankie, Johnnie & Luigi Too!"]

master = open("master.csv", "r")
reader = csv.DictReader(master)
fileToWrite = open("reviewsWithMenus.csv", "w")
writer = csv.DictWriter(fileToWrite, fieldnames=["name", "numReviews", "yelpRating", "reviews"])
put = []

for i in range(0, len(restaurantsWithMenus)):
	restaurant = restaurantsWithMenus[i]
	for row in reader:
		name = row["name"]
		numReviews = row["numReviews"]
		yelpRating = row["yelpRating"]
		reviews = row["reviews"]
		if (name.lower() == restaurant.lower()):
			if name.lower() not in put:
				put.append(name.lower())
				writer.writerow({
					"name": name,
					"numReviews": numReviews,
					"yelpRating": yelpRating,
					"reviews": reviews
				})
	master.seek(0)
