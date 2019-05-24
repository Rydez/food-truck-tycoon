location-details
  p Go to the right location to get more business.

  .location
    h2 { location.name }
    .rent-row
      h2(
        class="{ red: active_career.cash < location.cost }"
      ) ${ location.cost }
      button(
        disabled="{ \
          active_career.location === location.id || \
          active_career.cash < location.cost \
        }"
      ) Rent
      h2.red(if="{ active_career.location === location.id }") Current location.

    img(src="/static/{ get_image_name() }.png")

  .buttons
    button.last(
      onclick="{ last_location }"
      disabled="{ location_index <= 0 }"
    ) Last

    button.next(
      onclick="{ next_location }"
      disabled="{ location_index >= Object.keys(state.locations).length - 1 }"
    ) Next

  modal(
    ref="rent_modal"
    on-confirm="{ rent }"
  )
    .title Rent Location
    .content
      | Are you sure you want pay ${} to rent this location?
      .buttons
        button.cancel Cancel
        button.confirm Rent

  script.
    this.state = this.opts.store.state;

    this.location_index = 0;

    this.on('before-mount', () => {
      this.update_career();
      this.location = Object.values(this.state.locations)[this.location_index];
    });

    this.on('update', () => {
      this.update_career();
    });

    this.update_career = () => {
      this.active_career_id = this.state.active_career_id;
      for (let career of this.state.careers) {
        if (career.id === this.active_career_id) {
          this.active_career = career
          break;
        }
      }
    };

    this.open_rent_modal = () => {
      this.refs.rent_modal.show();
    };

    this.rent = () => {
      this.opts.store.update('career', this.active_career_id, {
        location: this.location.id
      });
    };

    this.get_image_name = () => {
      return this.location.name.toLowerCase().replace(/ /g, '-');
    };

    this.last_location = () => {
      this.location_index -= 1;
      this.location = Object.values(this.state.locations)[this.location_index];
      this.update();
    }

    this.next_location = () => {
      this.location_index += 1;
      this.location = Object.values(this.state.locations)[this.location_index];
      this.update();
    }