menu-item-details
  p Make your menu, Chef!

  button(onclick="{ open_new_menu_items_modal }") New Menu Item

  h2 Menu Items:
  h1(if="{ career_menu_items.length === 0 }")
    | Your menu is empty!
  table(if="{ career_menu_items.length > 0 }")
    tbody
      tr(each="{ career_menu_items }")
        td
          p { state.menu_items[menu_item].name }
        td
          ul
            li(each="{ menu_item_resource in state.menu_items[menu_item].menu_item_resources }")
              | { menu_item_resource.quantity }
              | { menu_item_resource.resource.unit }
              | { menu_item_resource.resource.name }
        td
          ul
            li(each="{ equipment in state.menu_items[menu_item].equipment }")
              | { equipment.name }
        td
          button(
            onclick="{ open_destroy_menu_item_modal }"
            value="{ id }"
          ) Delete

  modal(
    ref="new_menu_items_modal"
    on-confirm="{ new_menu_items }"
  )
    .title New Menu Items
    .content
      | Add some stuff to your menu!
      table
        tbody
          tr(each="{ menu_item in parent.state.menu_items }")
            td
              p { menu_item.name }
            td
              ul
                li(each="{ menu_item_resource in menu_item.menu_item_resources }")
                  | { menu_item_resource.quantity }
                  | { menu_item_resource.resource.unit }
                  | { menu_item_resource.resource.name }
            td
              ul
                li(each="{ equipment in menu_item.equipment }")
                  | { equipment.name }
            td
              input(
                ref="menu_item_{ menu_item.id }"
                type="checkbox"
                name="menu_items"
                value="{ menu_item.id }"
              )
      .buttons
        button.cancel Cancel
        button.confirm Add Items

  modal(
    ref="destroy_menu_item_modal"
    on-confirm="{ destroy_menu_item }"
  )
    .title Destroy Menu Item
    .content
      | Are you sure you want to destroy this menu item?
      .buttons
        button.cancel Cancel
        button.confirm Destroy

  script.
    this.state = this.opts.store.state;

    this.on('before-mount', () => {
      this.update_career_menu_items();
    });

    this.on('update', () => {
      this.update_career_menu_items();
    });

    this.update_career_menu_items = () => {
      this.active_career_id = this.state.active_career_id;
      for (let career of this.state.careers) {
        if (career.id === this.active_career_id) {
          this.active_career = career
          this.career_menu_items = career.career_menu_items;
          break;
        }
      }
    };

    this.open_new_menu_items_modal = () => {
      this.refs.new_menu_items_modal.show();
    };

    this.new_menu_items = () => {
      const checkboxes = this.refs.new_menu_items_modal.refs;
      for (let checkbox_name in checkboxes) {
        if (checkboxes[checkbox_name].checked) {
          this.opts.store.create('career_menu_items', {
            menu_item: checkboxes[checkbox_name].value,
            career: this.active_career.id
          });

          checkboxes[checkbox_name].checked = false;
        }
      }
    };

    this.open_destroy_menu_item_modal = (ev) => {
      const career_menu_item_id = ev.target.value;
      this.refs.destroy_menu_item_modal.show(career_menu_item_id);
    };

    this.destroy_menu_item = (ev, career_menu_item_id) => {
      this.opts.store.destroy('career_menu_items', career_menu_item_id);
    };
