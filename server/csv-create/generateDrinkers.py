import csv
import random 
import decimal

drinkerbase = open('drinkersbase.csv', "rb")
drinkers = open('drinkers.csv', "wb")

drinker_reader = csv.reader(drinkerbase)
drinker_writer = csv.writer(drinkers, delimiter= ',')

for row in drinker_reader:
	drinkerdata = list(drinker_reader)


states = ["NJ", "MA", "NY", "PA"]
NJcity = ["Newark", "New Brunswick"]
NYcity = ["New York", "Albany"]
PAcity = ["Pittsburgh", "Philadelphia"]
MAcity = ["Boston", "Quincy"]

drinker_writer.writerow('name,city,addr, state, phone')
new_rows_list= []
rownum = 1

for i in drinkerdata:
	#print(bardata)
	#randint_bar = random.randint(1, len(bardata)-1)
	#randint_beer = random.randint(1, len(beerdata)-1)

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

	new_row = [drinkerdata[rownum-1][0], city, drinkerdata[rownum-1][2], drinkerdata[rownum-1][3], randState]
	new_rows_list.append(new_row)

	rownum += 1

drinker_writer.writerows(new_rows_list)	
drinkers.close()

check = open('drinkers.csv', "rb")
check_reader = csv.reader(check)
for row in check_reader:
	print row

