

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


from random import randint, random
from ..models.headline import Headline
from ..models.location import Location

CONDITION_PROBABILITIES = {
  'sunny': 0.15,
  'cloudy': 0.05,
  'rainy': -0.05,
  'stormy': -0.15
}


def simulate_day(career):
  day = career.days.latest('created')
  menu_items = career.menu_items.all()
  resources = career.resources.all()
  headlines = Headline.objects.all().order_by('created')
  location = Location.objects.get(id=career.location.id)

  # Probability that someone will spawn
  # Probability is per minute
  MIN_PROBABILITY = 0.02
  MAX_PROBABILITY = 0.5

  people_probability = randint(MIN_PROBABILITY, MAX_PROBABILITY)

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
  people_probability += location.popularity

  # Probability that someone will get in line
  HEADLINE_COUNT = 7

  in_line_probability = 0.5

  recent_headlines = headlines[-HEADLINE_COUNT:]

  # Location headlines
  for headline in recent_headlines:
    if headline.location == location.id:
      in_line_probability += polarity

  if in_line_probability < 0:
    in_line_probability = 0
  elif in_line_probability > 1:
    in_line_probability = 1

  # Menu item headlines
  menu_item_probabilities = {}
  for menu_item in menu_items:
    for headline in recent_headlines:
      if headline.menu_item.id == menu_item.id:
        if menu_item.name in menu_item_probabilities
          menu_item_probabilities[menu_item.name] += headline.polarity
        else:
          menu_item_probabilities[menu_item.name] = headline.polarity

# price
# menu_item
# day
# result
# review
# review_polarity
  MIN_WAIT_TIME = 5
  MAX_WAIT_TIME = 10

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
      condition_probability = CONDITION_PROBABILITIES[day['dawn_condition']]
    elif minute < LAST_NOON_MINUTE:
      condition_probability = CONDITION_PROBABILITIES[day['noon_condition']]
    else:
      condition_probability = CONDITION_PROBABILITIES[day['dusk_condition']]

    if random() > people_probability + condition_probability:
      continue

    sale = {
      'result': 'passed',
      'minute_of_day': minute
    }

    if random() < in_line_probability:
      current_wait_time += randint(MIN_WAIT_TIME, MAX_WAIT_TIME)


      # This will help determine how many people
      # order a menu_item and whether or not they have a good review.
      # For example, a customer is more likely to order a menu_item
      # with higher sentiment. But, if a menu_item has a low sentiment
      # compared to all other menu_items (on and off the truck),
      # then likelihood of `distastful` increases.

    sales.append(sale)



  print('run simulator')

