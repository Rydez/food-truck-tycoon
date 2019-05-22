truck-details
  p Get a bigger truck to do more business.

  h2 Trucks:
  h1 { truck.name }
  h1 ${ truck.cost }
  h1 Capacity: { truck.capacity }lbs

  button Buy

  .buttons
    button Last
    button Next

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

    this.on('before-mount', () => {
      this.update_career();
      this.truck = Object.values(this.state.trucks)[0];
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

    this.open_upgrade_modal = () => {
      this.refs.upgrade_modal.show();
    };

    this.open_downgrade_modal = () => {
      this.refs.downgrade_modal.show();
    };

    this.buy = () => {
      this.opts.store.create('career', {
        truck: this.truck.id
      });
    };