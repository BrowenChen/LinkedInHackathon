from selenium import webdriver
import time
import csv

# base = "http://www.yelp.com/search?find_desc=Restaurants&find_loc=Mountain+View%2C+CA&ns=1"

# linkFile = open("restaurantLinks.txt", "w")

# driver = webdriver.Firefox()
# driver.get(base)
# links = [anchor.get_attribute("href") for anchor in driver.find_elements_by_css_selector('a.biz-name')]
# pageOfPagesText = driver.find_element_by_class_name("page-of-pages").text
# pageOfPagesText = pageOfPagesText.split("Page ", 1)[1]
# currPage = int(pageOfPagesText[:pageOfPagesText.index(" ")])
# totalPages = int(pageOfPagesText.split("of ", 1)[1])

# urlStartHash = 0
# while (urlStartHash < totalPages * 10):
# 	urlStartHash += 10
# 	driver.get(base + "#start=" + str(urlStartHash))
# 	time.sleep(5)
# 	links += [anchor.get_attribute("href") for anchor in driver.find_elements_by_css_selector('a.biz-name')]

# for link in links:
# 	linkFile.write(link + "\n")

restaurantDataFile = open("restaurantData.csv", "w")
writer = csv.DictWriter(restaurantDataFile, fieldnames=["name", "numReviews", "yelpRating", "reviews"])

driver = webdriver.Firefox()
urls = [line.rstrip('\n') for line in open('restaurantLinks.txt')]

for url in urls:

	try:
		driver.get(url)
		reviewsText = driver.find_element_by_class_name("review-count").text
		numReviews = reviewsText[:reviewsText.index(" ")]
		name = driver.find_element_by_class_name("biz-page-title").text
		yelpRating = driver.find_element_by_xpath("//*[@id='wrap']/div[3]/div/div[1]/div/div[2]/div[1]/div/div[1]/div[1]/div/meta").get_attribute("content")

		pageOfPagesText = driver.find_element_by_class_name("page-of-pages").text
		pageOfPagesText = pageOfPagesText.split("Page ", 1)[1]
		currPage = int(pageOfPagesText[:pageOfPagesText.index(" ")])
		totalPages = int(pageOfPagesText.split("of ", 1)[1])

		urlStartHash = 0
		reviews = []

		while (urlStartHash < totalPages * 10 and len(reviews) < 100):
			reviews += [paragraph.text for paragraph in driver.find_elements_by_css_selector("[itemprop='description']")]
			urlStartHash += 10
			driver.get(url + "#start=" + str(urlStartHash))
			time.sleep(5)

		toWrite = {
			"name": name,
			"numReviews": numReviews,
			"yelpRating": yelpRating,
			"reviews": str(reviews)
		}
		writer.writerow(toWrite)
	except:
		pass







