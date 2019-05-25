game-body
  game-header(store="{ opts.store }")
  #menu-and-day
    menu(store="{ opts.store }")
    day

  script.
    import './game-header.tag';
    import './game-header.styl';

    import './day/day.tag';
    import './day/day.styl';

    import './menu/menu.tag';
    import './menu/menu.styl';