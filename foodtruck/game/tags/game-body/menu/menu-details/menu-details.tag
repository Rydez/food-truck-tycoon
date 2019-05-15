menu-details
  career-details(
    if="{ active_section_name === 'careers' }"
    store="{ opts.store }"
  )

  equipment-details(
    if="{ active_section_name === 'equipment' }"
    store="{ opts.store }"
  )

  truck-details(
    if="{ active_section_name === 'trucks' }"
    store="{ opts.store }"
  )

  menu-item-details(
    if="{ active_section_name === 'menu-items' }"
    store="{ opts.store }"
  )

  resource-details(
    if="{ active_section_name === 'resources' }"
    store="{ opts.store }"
  )

  location-details(
    if="{ active_section_name === 'locations' }"
    store="{ opts.store }"
  )

  script.
    import './career-details.tag';
    import './equipment-details.tag';
    import './truck-details.tag';
    import './menu-item-details.tag';
    import './resource-details.tag';
    import './location-detials.tag';

    this.on('update', () => {
      this.active_section_name = this.opts.store.state.active_section_name;
    });