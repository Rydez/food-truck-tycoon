import 'riot';

const state = {};
riot.observable(state);

const retrieve = async (name) => {
  try {
    const response = await fetch(`/api/${name}/`, {
      method: 'get',
      credentials: 'same-origin',
      headers: {
        'X-CSRFToken': window.django.csrf,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    state[name] = await response.json();
    state.trigger('update');
    console.log(state)
  }
  catch (err) {
    console.log('Failed', err);
  }
};

const create = async (name, data) => {
  try {
    const response = await fetch(`/api/${name}/`, {
      method: 'post',
      body: JSON.stringify(data),
      credentials: 'same-origin',
      headers: {
        'X-CSRFToken': window.django.csrf,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log(await response.json());

    retrieve('careers');
  }
  catch (err) {
    console.log('Failed', err);
  }
};

const update = async (name, id, data) => {
  try {
    const response = await fetch(`/api/${name}/${id}/`, {
      method: 'put',
      body: JSON.stringify(data),
      credentials: 'same-origin',
      headers: {
        'X-CSRFToken': window.django.csrf,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const text = await response.text();
    let result = '';
    try {
      result = JSON.parse(text);
    }
    catch (error) {
      console.log(error);
      result = text;
    }

    console.log(result)

    retrieve('careers');
  }
  catch (err) {
    console.log('Failed', err);
  }
};

const destroy = async (name, id) => {
  try {
    const response = await fetch(`/api/${name}/${id}/`, {
      method: 'delete',
      credentials: 'same-origin',
      headers: {
        'X-CSRFToken': window.django.csrf,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    retrieve('careers');
  }
  catch (err) {
    console.log('Failed', err);
  }
};

const activate_career = (career_id) => {
  for (let career of state.careers) {
    if (career.id === Number(career_id)) {
      state.active_career = career
      break;
    }
  }

  state.active_section_name = 'menu-items';
  state.trigger('update');
};

const activate_section = (section_name) => {
  if (section_name === 'careers') {
    state.active_career = null;
  }

  state.active_section_name = section_name;
  state.trigger('update');
};

export {
  state,
  retrieve,
  create,
  update,
  destroy,
  activate_career,
  activate_section
};