equipment-details
  p Pick the equipment for your truck

  button(onclick="{ open_new_equipment_modal }") Buy Equipment

  h2 Equipment:
  h1(if="{ state.active_career.career_equipment.length === 0 }")
    | Your truck is empty!
  table(if="{ state.active_career.career_equipment.length > 0 }")
    tbody
      tr(each="{ state.active_career.career_equipment }")
        td
          p { state.equipment[equipment].name }
        td
          p ${ state.equipment[equipment].cost }
        td
          button(
            onclick="{ open_destroy_equipment_modal }"
            value="{ id }"
          ) Delete

  modal(
    ref="new_equipment_modal"
    on-confirm="{ new_equipment }"
  )
    .title Buy Equipment
    .content
      | Buy some equipment for your truck!
      table
        tbody
          tr(each="{ equipment in parent.state.equipment }")
            td
              p { equipment.name }
            td
              p ${ equipment.cost }
            td
              input(
                ref="equipment_{ equipment.id }"
                type="checkbox"
                name="equipment"
                value="{ equipment.id }"
              )
      .buttons
        button.cancel Cancel
        button.confirm Buy Equipment

  modal(
    ref="destroy_equipment_modal"
    on-confirm="{ destroy_equipment }"
  )
    .title Destroy Equipment
    .content
      | Are you sure you want to destroy this equipment?
      .buttons
        button.cancel Cancel
        button.confirm Destroy

  script.
    this.state = this.opts.store.state;

    this.open_new_equipment_modal = () => {
      this.refs.new_equipment_modal.show();
    };

    this.new_equipment = () => {
      const checkboxes = this.refs.new_equipment_modal.refs;
      for (let checkbox_name in checkboxes) {
        if (checkboxes[checkbox_name].checked) {
          this.opts.store.create('career_equipment', {
            equipment: checkboxes[checkbox_name].value,
            career: this.state.active_career.id
          });

          checkboxes[checkbox_name].checked = false;
        }
      }
    };

    this.open_destroy_equipment_modal = (ev) => {
      const career_equipment_id = ev.target.value;
      this.refs.destroy_equipment_modal.show(career_equipment_id);
    };

    this.destroy_menu_item = (ev, career_equipment_id) => {
      this.opts.store.destroy('career_equipment', career_equipment_id);
    };
