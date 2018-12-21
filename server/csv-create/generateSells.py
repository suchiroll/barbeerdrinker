import csv
import random 
import decimal

beers = open('beers.csv', "rb")
bars = open('bars.csv', "rb")
sells = open('sells.csv', 'wb')

bar_reader = csv.reader(bars)
beer_reader = csv.reader(beers)
sells_writer = csv.writer(sells, delimiter= ',')

for row in bar_reader:
	bardata = list(bar_reader)


for row in beer_reader:
	beerdata = list(beer_reader)


sells_writer.writerow('bar,beer,price')
new_rows_list= []
rownum = 1
for i in bardata:
	#print(bardata)
	#randint_bar = random.randint(1, len(bardata)-1)
	#randint_beer = random.randint(1, len(beerdata)-1)
	count = 0;
	while(count < 10):
		randBeer = random.randint(0,len(beerdata)-1)
		#print(bardata[rownum-1][0], randBeer, beerdata[randBeer][0])
		randPrice = 0;
		if(randBeer%2 == 0):
			randPrice = float(decimal.Decimal(random.randrange(450,950))/100)
		else:
			randPrice = float(decimal.Decimal(random.randrange(450,950))/100)
		#print(randPrice)
		new_row = [bardata[rownum-1][0], beerdata[randBeer][0], randPrice]
		new_rows_list.append(new_row)
		count+=1
	rownum += 1

sells_writer.writerows(new_rows_list)	
sells.close()

check = open('sells.csv', "rb")
check_reader = csv.reader(check)
for row in check_reader:
	print row

