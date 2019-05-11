game-body
  game-header(store="{ opts.store }")
  #display-and-menu
    menu(store="{ opts.store }")
    display

  script.
    import './game-header.tag';
    import './game-header.styl';

    import './display.tag';
    import './display.styl';

    import './menu/menu.tag';
    import './menu/menu.styl';