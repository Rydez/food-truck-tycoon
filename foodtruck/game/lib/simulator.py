

'''
  FACTORS

  location_popularity, max_temp, min_temp, dawn_condition, noon_condition,
  dusk_condition - These will help determine how many potential
  customers are generated.

  employees (TODO) - This will help determine how long someone
  waits in line.

  location_sentiment - This will help determine how many people
  get in line, and whether or not they have a good review.

  menu_item_sentiment - This will help determine how many people
  order a menu_item and whether or not they have a good review.
  For example, a customer is more likely to order a menu_item
  with higher sentiment. But, if a menu_item has a low sentiment
  compared to all other menu_items (on and off the truck),
  then likelihood of `distastful` increases.

  rating, advertisement (TODO) - This will help determine how many customers actually
  get in line.

'''

import numpy
from random import randint, random, uniform
from ..models.sale import Sale
from ..models.headline import Headline
from ..models.location import Location
from ..models.menu_item import MenuItem

CONDITION_PROBABILITIES = {
  'sunny': 0.15,
  'cloudy': 0.05,
  'rainy': -0.05,
  'stormy': -0.15
}


def simulate_day(career):
  day = career.days.latest('created')
  career_menu_items = career.menu_items.all()
  all_menu_items = MenuItem.objects.all()
  career_resources = career.resources.all()
  headlines = Headline.objects.all().order_by('-created')
  location = Location.objects.get(id=career.location.id)

  # Probability that someone will spawn
  # Probability is per minute
  MIN_PROBABILITY = 0.02
  MAX_PROBABILITY = 0.5

  people_probability = uniform(MIN_PROBABILITY, MAX_PROBABILITY)

  # Weather effect
  IDEAL_TEMP = 72

  temp_difference = day.max_temp - day.min_temp
  center_temp = temp_difference / 2

  TEMP_FACTOR = 0.03

  # For every degree off ideal, subtract some probability
  people_probability -= round(TEMP_FACTOR * abs(center_temp - IDEAL_TEMP))

  # For every degree of range subtract some probability
  people_probability -= round(TEMP_FACTOR * temp_difference)

  # Add people bonus for location popularity
  people_probability += float(location.popularity)

  # Probability that someone will get in line
  HEADLINE_COUNT = 7

  in_line_probability = 0.5

  recent_headlines = headlines[:HEADLINE_COUNT]

  # Location headlines
  for headline in recent_headlines:
    if headline.location == location.id:
      in_line_probability += polarity

  if in_line_probability < 0:
    in_line_probability = 0
  elif in_line_probability > 1:
    in_line_probability = 1

  # Menu item headlines
  menu_item_probabilities_dict = {}
  for menu_item in all_menu_items:
    for headline in recent_headlines:
      if headline.menu_item.id == menu_item.id:
        if menu_item.name in menu_item_probabilities_dict:
          menu_item_probabilities_dict[menu_item.name] += headline.polarity
        else:
          menu_item_probabilities_dict[menu_item.name] = 0.5 + headline.polarity

  menu_item_probabilities = []
  for name, probability in menu_item_probabilities_dict.items():
    menu_item_probabilities.append({
      'name': name,
      'probability': probability
    })

  career_menu_items_by_name = {}
  for menu_item in career_menu_items:
    career_menu_items_by_name[menu_item.name] = menu_item

  menu_item_probabilities = sorted(menu_item_probabilities, key=lambda i: i['probability'])

  MIN_WAIT_TIME = 2
  MAX_WAIT_TIME = 10

  IDEAL_WAIT_TIME = MAX_WAIT_TIME - MIN_WAIT_TIME

  current_wait_time = 0

  sales = []
  MINUTES_IN_DAY = 12 * 60
  LAST_DAWN_MINUTE = 4 * 60
  LAST_NOON_MINUTE = 4 * 60
  for minute in range(MINUTES_IN_DAY):
    if current_wait_time > 0:
      current_wait_time -= 1

    condition_probability = 0
    if minute < LAST_DAWN_MINUTE:
      condition_probability = CONDITION_PROBABILITIES[day.dawn_condition]
    elif minute < LAST_NOON_MINUTE:
      condition_probability = CONDITION_PROBABILITIES[day.noon_condition]
    else:
      condition_probability = CONDITION_PROBABILITIES[day.dusk_condition]

    if random() > people_probability + condition_probability:
      continue

    sale = {
      'result': 'passed',
      'minute_of_day': minute
    }

    if random() < in_line_probability:
      current_wait_time += randint(MIN_WAIT_TIME, MAX_WAIT_TIME)

      # Customer will judge on 3 categories: taste, speed, and price.
      # The customer's review will then be which ever one is most polarized.

      # Rate the speed
      speed_rating = round(5 - (current_wait_time / IDEAL_WAIT_TIME))

      # Choose and rate the menu item
      cost_of_resources = 0
      menu_item_random = random()
      taste_rating = 0
      for menu_item_probability in menu_item_probabilities:
        cost_of_resources = 0
        name = menu_item_probability['name']
        probability = menu_item_probability['probability']
        career_menu_item = career_menu_items_by_name[name]

        is_probable = menu_item_random < probability
        is_on_menu = name in career_menu_items_by_name
        has_resources = True
        for menu_item_resource in career_menu_item.menu_item_resources.all():
          cost_of_resources += menu_item_resource.resource.cost * menu_item_resource.quantity
          for career_resource in career_resources:
            is_resource = menu_item_resource.resource.id == career_resource.resource.id
            not_enough = career_resource.quantity < menu_item_resource.quantity
            if is_resource and not_enough:
              has_resources = False

        if is_probable and is_on_menu and has_resources:
          sale['menu_item'] = career_menu_item.id
          sale['price'] = career_menu_item.price
          taste_rating = round(5 * probability, 1)

      # Rate the price
      reasonable_profit_factor = 3
      ideal_price = reasonable_profit_factor * cost_of_resources
      price_rating = round(2.5 * (ideal_price / career_menu_item.price), 1)
      if price_rating > 5:
        price_rating = 5        

      speed_polarity = abs(speed_rating - 2.5)
      taste_polarity = abs(taste_rating - 2.5)
      price_polarity = abs(price_rating - 2.5)

      # Normalize
      polarity_sum = speed_polarity + taste_polarity + price_polarity
      speed_probability = speed_polarity / polarity_sum
      taste_probability = taste_polarity / polarity_sum
      price_probability = price_polarity / polarity_sum

      review_type = numpy.random.choice(
        ['speed', 'taste', 'price'], 
        p=[speed_probability, taste_probability, price_probability]
      )

      if review_type == 'speed':
        sale['rating'] = speed_rating
        sale['review'] = 'fast' if speed_rating > 2.5 else 'slow'
      elif review_type == 'taste':
        sale['rating'] = taste_rating
        sale['review'] = 'tasteful' if taste_rating > 2.5 else 'distasteful'
      elif review_type == 'price':
        sale['rating'] = price_rating
        sale['review'] = 'cheap' if price_rating > 2.5 else 'expensive'

      # One star or less is a rejection
      sale['result'] = 'rejected' if sale['rating'] < 1 else 'purchased'

    sales.append(sale)

  for sale in sales:
    Sale(**sale).save()