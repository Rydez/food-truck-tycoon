day
  p(if="{ !state.active_career }") No career to display.
  .day-info(if="{ state.active_career }")
    p Day { current_day }
    p.headline { day.headline }
  .weather(if="{ state.active_career }")
    p { day.min_temp }F - { day.max_temp }F
    p Dawn { day.dawn_condition }, Noon { day.noon_condition }, Dusk { day.dusk_condition }


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

        this.current_day = this.state.active_career.days.length;
        this.day = this.state.active_career.days[this.current_day - 1];
      }
    });
