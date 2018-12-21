import csv
import random 
import decimal

barsbase = open('barsbase.csv', "rb")
bars = open('bars.csv', "wb")

bar_reader = csv.reader(barsbase)
bar_writer = csv.writer(bars, delimiter= ',')

for row in bar_reader:
	bardata = list(bar_reader)


states = ["NJ", "MA", "NY", "PA"]
NJcity = ["Newark", "New Brunswick"]
NYcity = ["New York", "Albany"]
PAcity = ["Pittsburgh", "Philadelphia"]
MAcity = ["Boston", "Quincy"]

bar_writer.writerow('name,city,addr,license,phone, houropen, hourclose, state, phone')
new_rows_list= []
rownum = 1
for i in bardata:
	#print(bardata)
	#randint_bar = random.randint(1, len(bardata)-1)
	#randint_beer = random.randint(1, len(beerdata)-1)
	randOpenHour = random.randint(15, 19)
	randCloseHour = random.randint(1, 4)
	randint = random.randint(1,4)
	randState = states[randint-1]
	city = ""
	if(randint == 1):
		rand = random.randint(1,2)
		city = NJcity[rand-1]
	elif(randint == 2):
		rand = random.randint(1,2)
		city = NYcity[rand-1]
	elif(randint == 3):
		rand = random.randint(1,2)
		city = PAcity[rand-1]
	elif(randint == 4):
		rand = random.randint(1,2)
		city = MAcity[rand-1]
	else:
		city = "Anytown"

	new_row = [bardata[rownum-1][0], city, bardata[rownum-1][2], bardata[rownum-1][3], randOpenHour, randCloseHour, randState, bardata[rownum-1][4]]
	new_rows_list.append(new_row)

	rownum += 1

bar_writer.writerows(new_rows_list)	
bars.close()

check = open('bars.csv', "rb")
check_reader = csv.reader(check)
for row in check_reader:
	print row

