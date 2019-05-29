day
  p(if="{ !state.active_career }") No career to display.
  .day-info(if="{ state.active_career }")
    p Day { current_day }
    p.headline { day.headline }
  .weather(if="{ state.active_career }")
    p { day.min_temp }F - { day.max_temp }F
    p Dawn { day.dawn_condition }, Noon { day.noon_condition }, Dusk { day.dusk_condition }

  world

  .day-controls(if="{ state.active_career }")
    button(
      onclick="{ start_day }"
      disabled="{ state.active_career.career_menu_items.length === 0 }"
    ) Start Day
    h2.red(if="{ state.active_career.career_menu_items.length === 0 }")
      | Can't start the day without menu items!

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

    this.start_day = () => {
      this.opts.store.create('days', {
        career: this.state.active_career.id
      });
    };