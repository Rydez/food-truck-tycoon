career-details
  p Create a new career, or continue a previous one.

  button(onclick="{ open_new_career_modal }") New Career

  h2 Careers:
  table
    tbody
      tr(each="{ career in opts.store.state.careers }")
        td
          p { career.name }
        td
          button(
            onclick="{ activate_career }"
            value="{ career.id }"
          ) Load
        td
          button(
            onclick="{ open_destroy_career_modal }"
            value="{ career.id }"
          ) Delete

  modal(
    ref="new_career_modal"
    on-confirm="{ new_career }"
  )
    .title New Career
    .content
      | Enter the name of your new food truck!
      input(ref="new_career_name" type="text")
      .buttons
        button.cancel Cancel
        button.confirm Create

  modal(
    ref="destroy_career_modal"
    on-confirm="{ destroy_career }"
  )
    .title Destroy Career
    .content
      | Are you sure you want to destroy this career?
      .buttons
        button.cancel Cancel
        button.confirm Destroy

  script.
    this.open_new_career_modal = () => {
      this.refs.new_career_modal.show();
    };

    this.new_career = () => {
      const name = this.refs.new_career_modal.refs.new_career_name.value;
      this.opts.store.create('careers', { name });
    };

    this.open_destroy_career_modal = (ev) => {
      const career_id = ev.target.value;
      this.refs.destroy_career_modal.show(career_id);
    };

    this.destroy_career = (ev, career_id) => {
      this.opts.store.destroy('careers', career_id);
    };

    this.activate_career = (ev) => {
      const career_id = ev.target.value;
      this.opts.store.activate_career(career_id);
    };