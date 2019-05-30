import requests
headers = {'User-Agent': 'foodtruck'}
r = requests.get('https://www.reddit.com/hot.json', headers=headers)
data = r.json()
print(data)


