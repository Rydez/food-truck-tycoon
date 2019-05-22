app
  header
  game-body(if="{ django.user }" store="{ store }")
  game-overview(if="{ !django.user }")

  script.
    import './header.tag';
    import './header.styl';

    import './game-body/game-body.tag';
    import './game-body/game-body.styl';

    import './game-overview.tag';
    import './game-overview.styl';

    import './components';

    import * as store from '../js/store';

    this.store = store;

    this.on('mount', async () => {
      store.state.on('update', this.update);
      await store.retrieve('careers');
      await store.retrieve('menu_items');
      await store.retrieve('equipment');
      await store.retrieve('resources');
      await store.retrieve('trucks');
      await store.retrieve('locations');
      store.activate_section('careers');
    });