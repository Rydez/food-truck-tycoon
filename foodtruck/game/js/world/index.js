
import 'pixi';
import * as store from '../store';

let pixi_app;
let world_el;
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

  const resize = () => {
    pixi_app.renderer.resize(
      world_el.clientWidth,
      world_el.clientHeight
    );
  };

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
const set_location = async () => {
  if (location_sprite) {
    return;
  }

  const location = store.state.active_career.location;
  const location_name = store.state.locations[location].name;
  const location_slug = location_name.toLowerCase().replace(/ /g, '-');

  const texture = await load_texture(`/static/${ location_slug }.png`);
  location_sprite = new PIXI.Sprite(texture);
  location_sprite.width = world_el.clientWidth;
  location_sprite.height = location_sprite.width * (world_el.clientHeight / world_el.clientWidth);
  pixi_app.stage.addChild(location_sprite);
};

const set_truck = () => {

};

export {
  initialize,
  set_location,
  set_truck
};