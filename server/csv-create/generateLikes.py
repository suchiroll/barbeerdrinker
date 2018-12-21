import csv
import random 
import decimal

beers = open('beers.csv', "rb")
drinkers = open('drinkers.csv', "rb")
likes = open('likes.csv', 'wb')

drinker_reader = csv.reader(drinkers)
beer_reader = csv.reader(beers)
likes_writer = csv.writer(likes, delimiter= ',')

for row in drinker_reader:
	drinkerdata = list(drinker_reader)

for row in beer_reader:
	beerdata = list(beer_reader)


likes_writer.writerow('drinker','beer')
new_rows_list= []
rownum = 1
for i in drinkerdata:
	#print(drinkerdata)
	#randint_drinker = random.randint(1, len(drinkerdata)-1)
	#randint_beer = random.randint(1, len(beerdata)-1)
	count = 0;
	while(count < 5):
		randBeer = random.randint(0,len(beerdata)-1)
		#print(drinkerdata[rownum-1][0], randBeer, beerdata[randBeer][0])
		
		#randPrice = float(decimal.Decimal(random.randrange(450,950))/100)
		#print(randPrice)
		new_row = [drinkerdata[rownum-1][0], beerdata[randBeer][0]]
		new_rows_list.append(new_row)
		count+=1
	rownum += 1

likes_writer.writerows(new_rows_list)	
likes.close()

check = open('likes.csv', "rb")
check_reader = csv.reader(check)
for row in check_reader:
	print row

