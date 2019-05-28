
import 'pixi';
import * as store from '../store';

let pixi_app;
let world_el;

let length;
const resize = () => {
  if (world_el.clientWidth < world_el.clientHeight) {
    length = world_el.clientWidth;
  }
  else {
    length = world_el.clientHeight;
  }

  pixi_app.renderer.resize(length, length);
};

const initialize = () => {
  [world_el] = document.getElementsByTagName('world');
  pixi_app = new PIXI.Application({
    autoResize: true,
    resolution: 2,
    antialias: true
  });

  if (pixi_app.renderer instanceof PIXI.CanvasRenderer) {
    console.log('rendering with canvas');
  }
  else {
    console.log('rendering with webgl');
  }

  window.addEventListener('resize', resize);
  resize();

  world_el.appendChild(pixi_app.view);
};

const load_texture = async (texture_path) => {
  return await new Promise((resolve, reject) => {
    const texture = PIXI.Texture.fromImage(texture_path);
    if (texture.baseTexture.hasLoaded) {
      resolve(texture);
    }
    else {
      texture.on('update', () => {
        if (texture.baseTexture.hasLoaded) {
          resolve(texture);
        }
      });
    }
  });
};

let location_sprite;
let location_id;
const set_location = async () => {
  if (location_id === store.state.active_career.location) {
    return;
  }

  if (location_sprite) {
    location_sprite.destroy();
  }

  location_id = store.state.active_career.location;
  const location_name = store.state.locations[location_id].name;
  const location_slug = location_name.toLowerCase().replace(/ /g, '-');

  const texture = await load_texture(`/static/${ location_slug }.png`);
  location_sprite = new PIXI.Sprite(texture);
  location_sprite.width = length;
  location_sprite.height = length;
  pixi_app.stage.addChildAt(location_sprite, 0);
};

let truck_sprite;
let truck_id;
const set_truck = async () => {
  if (truck_id === store.state.active_career.truck) {
    return;
  }

  if (truck_sprite) {
    truck_sprite.destroy();
  }

  truck_id = store.state.active_career.truck;
  const truck_name = store.state.trucks[truck_id].name;
  const truck_slug = truck_name.toLowerCase().replace(/ /g, '-');

  const texture = await load_texture(`/static/${ truck_slug }.png`);
  truck_sprite = new PIXI.Sprite(texture);
  truck_sprite.anchor.x = 0.5;
  truck_sprite.anchor.y = 0.5;

  const location = store.state.active_career.location;
  const truck_position = store.state.locations[location].truck_position;

  truck_sprite.x = truck_position.x * location_sprite.width;
  truck_sprite.y = truck_position.y * location_sprite.height;
  if (truck_position.direction === 'right') {
    truck_sprite.scale.x *= -1;
  }

  pixi_app.stage.addChild(truck_sprite);
};

export {
  initialize,
  set_location,
  set_truck
};