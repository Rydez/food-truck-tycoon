

def simulate_day(career):
  day = career.days.latest('created')
  equipment = career.equipment.all()
  menu_items = career.menu_items.all()
  resources = career.resources.all()


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



  print('run simulator')