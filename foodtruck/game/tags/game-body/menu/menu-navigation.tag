menu-navigation
  button(
    class="{ activated: state.active_section_name === 'careers' }"
    onclick="{ activate_section }"
    value="careers"
  ) Careers
  button(
    class="{ activated: state.active_section_name === 'menu-items' }"
    disabled="{ !state.active_career }"
    onclick="{ activate_section }"
    value="menu-items"
  ) Menu
  button(
    class="{ activated: state.active_section_name === 'resources' }"
    disabled="{ !state.active_career }"
    onclick="{ activate_section }"
    value="resources"
  ) Supplies
  button(
    class="{ activated: state.active_section_name === 'equipment' }"
    disabled="{ !state.active_career }"
    onclick="{ activate_section }"
    value="equipment"
  ) Equipment
  button(
    class="{ activated: state.active_section_name === 'trucks' }"
    disabled="{ !state.active_career }"
    onclick="{ activate_section }"
    value="trucks"
  ) Trucks
  button(
    class="{ activated: state.active_section_name === 'locations' }"
    disabled="{ !state.active_career }"
    onclick="{ activate_section }"
    value="locations"
  ) Location
  button(
    class="{ activated: state.active_section_name === 'employees' }"
    disabled="{ !state.active_career }"
    onclick="{ activate_section }"
    value="employees"
  ) Staff
  button(
    class="{ activated: state.active_section_name === 'sales' }"
    disabled="{ !state.active_career }"
    onclick="{ activate_section }"
    value="sales"
  ) Sales


  script.
    this.state = this.opts.store.state;

    this.activate_section = (ev) => {
      const section_name = ev.target.value;
      this.opts.store.activate_section(section_name);
    };