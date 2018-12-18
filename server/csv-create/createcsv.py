import csv
import random 

beers = open('beers.csv', "rb")
bars = open('breweries.csv', "rb")
names = open('names.csv', "rb")
main = open('barbeer.csv', 'wb')


main_reader = csv.reader(main)
bar_reader = csv.reader(bars)
beer_reader = csv.reader(beers)
name_reader = csv.reader(names)
main_writer = csv.writer(main, delimiter= ',')


for row in bar_reader:
	bardata = list(bar_reader)


for row in beer_reader:
	beerdata = list(beer_reader)


for row in name_reader:
	namedata = list(name_reader)


main_writer.writerow('name,beer,bar')
new_rows_list= []
rownum = 1
for i in namedata:
	randint_bar = random.randint(1, len(bardata)-1)
	randint_beer = random.randint(1, len(beerdata)-1)
	
	new_row = [namedata[rownum-1][0], beerdata[randint_beer][0], bardata[randint_bar][0]]
	new_rows_list.append(new_row)
	rownum += 1

main_writer.writerows(new_rows_list)	
main.close()

check = open('barbeer.csv', "rb")
check_reader = csv.reader(check)
for row in check_reader:
	print row


