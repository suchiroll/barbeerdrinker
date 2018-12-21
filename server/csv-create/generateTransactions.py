import csv
import random 
import decimal



bars = open('bars.csv', 'rb')
sells = open('sells.csv', 'rb')
likes = open('likes.csv', "rb")
frequents = open('frequents.csv', "rb")
transactions = open('transactions.csv', "wb")

bars_reader = csv.reader(bars)
sells_reader = csv.reader(sells)
likes_reader = csv.reader(likes)
frequents_reader = csv.reader(frequents)
transaction_writer = csv.writer(transactions, delimiter= ',')

for row in bars_reader:
	bardata = list(bars_reader)

for row in sells_reader:
	sellsdata = list(sells_reader)

for row in frequents_reader:
	frequentsdata = list(frequents_reader)

for row in likes_reader:
	likesdata = list(likes_reader)




transaction_writer.writerow('bar, drinker, beer, timestamp')
new_rows_list= []
rownum = 1
counter = 0


for i in frequentsdata:
	
	drinker = frequentsdata[rownum-1][1]
	bar = frequentsdata[rownum-1][0]
	beer = ""
	timestamp = "" 

	iSells = 0
	
	while(sellsdata[iSells][0] != bar):
		iSells = iSells+1
	
	iBar = 0

	while(bardata[iBar][0] != bar):
		iBar = iBar+1

	openHour = bardata[iBar][4]
	closeHour = bardata[iBar][5]

	j = 0 

	while(j < 3):
		# make date and get beer 
		rand = random.randint(1,9)
		beer = sellsdata[iSells+rand][1]

		#make date format '2009-05-18 22:11:11'
		year = '2018'
		month = str(random.randint(1,12))
		day = str(random.randint(1,28))
		hour = random.randint(1,2)
		if(hour == 1):
			hour = random.randint(1, int(closeHour))
		if(hour == 2):
			hour = random.randint(int(openHour),23)		
		
		
		hour = str(hour)

		minute = str(random.randint(0, 59))
		
		timestamp = year + '-';
		if(month < 10 ):
			timestamp = timestamp + '0' 
		timestamp = timestamp + month + '-'

		if(day < 10 ):
			timestamp = timestamp + '0' 
		timestamp = timestamp + day + ' '

		if(hour < 10 ):
			timestamp = timestamp + '0'
		timestamp = timestamp + hour + ':'

		if(minute < 10 ):
			timestamp = timestamp + '0' 
		timestamp = timestamp + minute + ':00'

		new_row = [bar, drinker, beer, timestamp]
		new_rows_list.append(new_row)
		j = j+1

	rownum = rownum + 1
		
		
transaction_writer.writerows(new_rows_list)	
transactions.close()

check = open('transactions.csv', "rb")
check_reader = csv.reader(check)
for row in check_reader:
	print row

