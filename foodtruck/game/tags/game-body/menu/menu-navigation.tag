menu-navigation
  button(
    class="{ activated: active_section_name === 'careers' }"
    onclick="{ activate_section }"
    value="careers"
  ) Careers
  button(
    class="{ activated: active_section_name === 'menu-items' }"
    disabled="{ !active_career_id }"
    onclick="{ activate_section }"
    value="menu-items"
  ) Menu
  button(
    class="{ activated: active_section_name === 'resources' }"
    disabled="{ !active_career_id }"
    onclick="{ activate_section }"
    value="resources"
  ) Supplies
  button(
    class="{ activated: active_section_name === 'equipment' }"
    disabled="{ !active_career_id }"
    onclick="{ activate_section }"
    value="equipment"
  ) Equipment
  button(
    class="{ activated: active_section_name === 'trucks' }"
    disabled="{ !active_career_id }"
    onclick="{ activate_section }"
    value="trucks"
  ) Trucks

  script.

    this.on('update', () => {
      this.active_career_id = this.opts.store.state.active_career_id;
      this.active_section_name = this.opts.store.state.active_section_name;
    });

    this.activate_section = (ev) => {
      const section_name = ev.target.value;
      this.opts.store.activate_section(section_name);
    };