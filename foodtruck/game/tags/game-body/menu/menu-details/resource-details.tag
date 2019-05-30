resource-details
  p Order supplies!

  button(onclick="{ open_new_resources_modal }") New Menu Item

  h2 Ingredients & Supplies:
  h1(if="{ out_of_everything }")
    | You're out of everything!
  table(if="{ !out_of_everything }")
    tbody
      tr(if="{ quantity > 0 }" each="{ state.active_career.career_resources }")
        td
          p { state.resources[resource].name }
        td
          p { quantity } { state.resources[resource].unit }

  modal(
    ref="new_resources_modal"
    on-confirm="{ new_resources }"
  )
    .title Buy Ingredients & Supplies
    .content
      | Get what you need for your menu!
      table
        tbody
          tr(each="{ resource in parent.state.resources }")
            td
              p { resource.name }
            td
              p ${ resource.cost }/{ resource.unit }
            td
              input(
                ref="resource_{ resource.id }"
                oninput="{ parent.parent.calculate_total }"
                type="text"
              )
      h3(class="{ red: parent.over_spent }") Total: ${ parent.total.toFixed(2) }
      .buttons
        button.cancel Cancel
        button.confirm(disabled="{ parent.over_spent }") Buy

  script.
    this.state = this.opts.store.state;
    this.out_of_everything = true;
    this.over_spent = false;
    this.total = 0;

    this.on('before-mount', () => {
      this.check_out_of_everything();
    });

    this.on('update', () => {
      this.check_out_of_everything();
    });

    this.check_out_of_everything = () => {
      this.out_of_everything = true;
      for (let career_resource of this.state.active_career.career_resources) {
        if (career_resource.quantity > 0) {
          this.out_of_everything = false;
          break;
        }
      }
    };

    this.open_new_resources_modal = () => {
      this.refs.new_resources_modal.show();
    };

    this.new_resources = () => {
      const fields = this.refs.new_resources_modal.refs;
      for (let field_name in fields) {
        const field = fields[field_name];
        if (field.value !== '' && !isNaN(Number(field.value))) {
          const resource_id = Number(field_name.split('_')[1]);
          const career_resource = this.state.active_career.career_resources.find((career_resource) => {
            return career_resource.resource === resource_id
          });

          this.opts.store.update('career_resources', career_resource.id, {
            resource: resource_id,
            career: this.state.active_career.id,
            quantity: career_resource.quantity + Number(field.value)
          });

          field.value = '';
        }
      }
    };

    this.calculate_total = () => {
      const fields = this.refs.new_resources_modal.refs;
      this.total = 0;
      for (let field_name in fields) {
        const resource_id = field_name.split('_')[1];
        const resource = this.state.resources[resource_id];
        const field = fields[field_name];
        if (field.value !== '' && !isNaN(Number(field.value))) {
          this.total += resource.cost * Number(field.value);
        }
      }

      this.over_spent = false;
      if (this.total > this.state.active_career.cash) {
        this.over_spent = true;
      }
    };