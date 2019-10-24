from bs4 import BeautifulSoup
import re
import os

if not os.path.isdir('_presentations'):
    os.mkdir('_presentations')

print('What zotero export file (HTML) would you like to parse?')
export_file = input()

with open(f'zotero_export/{ export_file }', "r") as f:
    contents = f.read()
    soup = BeautifulSoup(contents, 'lxml')
    divs = soup.find_all('div',{"class": "csl-entry"})
    for div in divs:
        text = div.text
        year = re.search(r'\d{4}', text).group(0)
        author = text.split(", ")[0]
        title = re.search(r'“(.*?)”', text).group(0).strip('“').strip('”')[:-1].replace(" ", "_")
        if not os.path.isdir(f'_presentations/{ year }'):
            os.mkdir(f'_presentations/{ year }')
        with open(f'_presentations/{ year }/{ author }_{ title }_{ year }.md', 'w') as p:
            p.write(f'---\npresentation_year: { year }\n---\n{ text }\n')
        # print(text, year, author, title)
