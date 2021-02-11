import requests
from bs4 import BeautifulSoup
import csv

url = "https://wisdomquotes.com/sad-quotes/"

# retrieve website 
res = requests.get(url)
soup = BeautifulSoup(res.content,'lxml')

# retrieves all quotes and stores in quotes_list
quotes = soup.find_all('blockquote')
print(quotes)

quotes_list = []

for q in quotes:
    quotes_list.append(q.get_text())

print(quotes_list)

with open('sad_quotes.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    for quote in quotes_list:
        split_quotes = quote.split('.')
        author = split_quotes[-1]
        complete_quote = ".".join(split_quotes[:-1]) + "."
        writer.writerow((complete_quote, author))
