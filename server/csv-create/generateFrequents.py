import csv
import random 
import decimal

drinkers = open('drinkers.csv', "rb")
bars = open('bars.csv', "rb")
frequents = open('frequents.csv', 'wb')

bar_reader = csv.reader(bars)
drinker_reader = csv.reader(drinkers)
frequents_writer = csv.writer(frequents, delimiter= ',')

for row in drinker_reader:
	drinkerdata = list(drinker_reader)


for row in bar_reader:
	bardata = list(bar_reader)


frequents_writer.writerow('customers,beer')
new_rows_list= []
rownum = 1
for i in bardata:
	#print(bardata)
	#randint_bar = random.randint(1, len(bardata)-1)
	#randint_beer = random.randint(1, len(beerdata)-1)
	count = 0;
	while(count < 5):
		randDrinker = random.randint(0,len(drinkerdata)-1)
		#print(bardata[rownum-1][0], randBeer, beerdata[randBeer][0])
		new_row = [bardata[rownum-1][0], drinkerdata[randDrinker][0]]
		new_rows_list.append(new_row)
		count+=1
	rownum += 1

frequents_writer.writerows(new_rows_list)	
frequents.close()

check = open('frequents.csv', "rb")
check_reader = csv.reader(check)
for row in check_reader:
	print row

