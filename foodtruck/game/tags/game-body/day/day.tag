day
  p(if="{ !state.active_career }") No career to display.
  p(if="{ state.active_career }") Day { state.active_career.days.length }

  world

  script.
    import * as world from '../../../js/world';

    this.state = this.opts.store.state;

    this.on('mount', () => {
      world.initialize();
    });

    this.on('update', () => {
      if (this.state.active_career) {
        world.set_location();
        world.set_truck();
      }
    });
