import csv
import random 
import decimal

beers = open('beers.csv', "rb")
bars = open('bars.csv', "rb")
sells = open('sells.csv', 'rb')
drinkers = open('drinkers.csv', "rb")
likes = open('likes.csv', "rb")
transactions = open('transactions.csv', "wb")

bar_reader = csv.reader(bars)
beer_reader = csv.reader(beers)
sells_reader = csv.reader(sells)
drinker_reader = csv.reader(drinkers)
likes_reader = csv.reader(likes)
transaction_writer = csv.writer(transactions, delimiter= ',')

for row in bar_reader:
	bardata = list(bar_reader)

for row in beer_reader:
	beerdata = list(beer_reader)

for row in sells_reader:
	sellsdata = list(sells_reader)

for row in drinker_reader:
	drinkerdata = list(drinker_reader)

for row in likes_reader:
	likesdata = list(likes_reader)




transaction_writer.writerow('bar, drinker, beer')
new_rows_list= []
rownum = 1
counter = 0


while(counter < 10000):
	randBar = random.randint(0, len(bardata)-1)
	randBeer = random.randint(0, len(beerdata)-1)
	randDrinker = random.randint(0, len(drinkerdata)-1)
	new_row = [bardata[randBar][0], beerdata[randBeer][0], drinkerdata[randDrinker][0]]
	new_rows_list.append(new_row)
	counter+=1



transaction_writer.writerows(new_rows_list)	
transactions.close()

check = open('transactions.csv', "rb")
check_reader = csv.reader(check)
for row in check_reader:
	print row

