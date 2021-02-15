import csv, re
from bs4 import BeautifulSoup
import urllib3
urllib3.disable_warnings()


http = urllib3.PoolManager()

def createAuthorQuery(name):
    name = name.split(' ')
    return "_".join(name)

def findBirthYear(author):
    url = 'https://en.wikipedia.org/wiki/' + createAuthorQuery(author)
    response = http.request('GET', url)
    soup = BeautifulSoup(response.data, 'lxml')

    # Retrieve DOB
    infoBox = soup.find("table",{"class":"infobox biography vcard"})
    if(infoBox == None):
        infoBox = soup.find("table",{"class":"infobox vcard"}) 
    
    if(infoBox == None):
        return None

    birthInfo = infoBox.find("th", text="Born").find_next('td')
    birthYear = re.search(r'(\d{4})', birthInfo.text)
    if(birthYear == None):
        birthYear = re.search(r'(\d{3})', birthInfo.text)
        if(birthYear == None):
            birthYear = re.search(r'(\d{2})', birthInfo.text)
            if(birthYear == None):
                birthYear = re.search(r'(\d{1})', birthInfo.text)
            
    if(birthYear == None):
        return None

    return birthYear.group(1)

def cleanData(filename):
    newFile = 'cleaned_' + filename
    
    csvfile = open(filename, 'r')
    reader = csv.reader(csvfile)

    with open(newFile, 'w', newline='') as file:
        writer = csv.writer(file)
        for row in reader:
            quote = row[0]
            quoteWriter = row[len(row) - 1]
            yearOfBirth = None
            try:
                yearOfBirth = findBirthYear(quoteWriter)
            except:
                print(quoteWriter + "failed")
            if(yearOfBirth != None and yearOfBirth < '1900'):
                writer.writerow((quote, quoteWriter))

def runAll():
    cleanData('sad_quotes.csv')
    cleanData("fear_quotes.csv")
    cleanData("happy_quotes.csv")
    cleanData("anger_quotes.csv")

runAll()

