truck-details
  p Get a bigger truck to do more business.

  .truck
    h2 { truck.name } Capacity: { truck.capacity }lbs
    .buy-row
      h2(
        class="{ red: state.active_career.cash < truck.cost }"
      ) ${ truck.cost }
      button(
        onclick="{  }"
        disabled="{ \
          state.active_career.truck === truck.id || \
          state.active_career.cash < truck.cost \
        }"
      ) Buy
      h2.red(if="{ state.active_career.truck === truck.id }") You own this truck.

    img(src="/static/{ get_image_name() }.png")

  .buttons
    button.last(
      onclick="{ last_truck }"
      disabled="{ truck_index <= 0 }"
    ) Last

    button.next(
      onclick="{ next_truck }"
      disabled="{ truck_index >= Object.keys(state.trucks).length - 1 }"
    ) Next

  modal(
    ref="upgrade_modal"
    on-confirm="{ buy }"
  )
    .title Upgrade Truck
    .content
      | Are you sure you want pay ${} to upgrade your truck?
      .buttons
        button.cancel Cancel
        button.confirm Upgrade

  modal(
    ref="downgrade_modal"
    on-confirm="{ buy }"
  )
    .title Downgrade Truck
    .content
      | Are you sure you want to downgrade your truck and receive ${}?
      .buttons
        button.cancel Cancel
        button.confirm Downgrade

  script.
    this.state = this.opts.store.state;

    this.truck_index = 0;

    this.on('before-mount', () => {
      this.truck = Object.values(this.state.trucks)[this.truck_index];
    });

    this.open_upgrade_modal = () => {
      this.refs.upgrade_modal.show();
    };

    this.open_downgrade_modal = () => {
      this.refs.downgrade_modal.show();
    };

    this.buy = () => {
      this.opts.store.update('career', this.active_career.id, {
        truck: this.truck.id
      });
    };

    this.get_image_name = () => {
      return this.truck.name.toLowerCase().replace(/ /g, '-');
    };

    this.last_truck = () => {
      this.truck_index -= 1;
      this.truck = Object.values(this.state.trucks)[this.truck_index];
      this.update();
    }

    this.next_truck = () => {
      this.truck_index += 1;
      this.truck = Object.values(this.state.trucks)[this.truck_index];
      this.update();
    }