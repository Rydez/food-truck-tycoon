import requests
from textblob import TextBlob
# from .models import Location

headers = {'User-Agent': 'foodtruck'}


# testimonial = TextBlob("This is why I'm not unsubscribing anytime soon. This subreddit is the shit.")
testimonial = TextBlob("I love the beach.")
print(testimonial.sentiment.polarity)
print(testimonial.sentiment.subjectivity)

locations = Location.objects.all()

for location in locations:



  for keyword in location.keywords:
    r = requests.get(
      f'https://www.reddit.com/search.json?q={keyword}&type=&sort=relevance&t=week',
      headers=headers
    )

    data = r.json()['data']
    posts = data['children']
    for post in posts:
      r = requests.get(
        f'https://www.reddit.com/{post['permalink']}',
        headers=headers
      )

      comments = r.json()[1]['data']

      print(data)

