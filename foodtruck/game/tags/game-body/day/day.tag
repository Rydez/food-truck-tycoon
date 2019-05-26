day
  p(if="{ !state.active_career }") No career to display.
  p(if="{ state.active_career }") Day { state.active_career.days.length }

  world

  script.
    import '../../../js/world';

    this.state = this.opts.store.state;