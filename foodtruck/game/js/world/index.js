
import 'pixi';
import * as store from '../store';

[this.world_el] = document.getElementsByTagName('world');
this.pixi_app = new PIXI.Application({
  autoResize: true,
  resolution: 2,
  antialias: true
});

if (this.pixi_app.renderer instanceof PIXI.CanvasRenderer) {
  console.log('rendering with canvas');
}
else {
  console.log('rendering with webgl');
}

const resize = () => {
  this.pixi_app.renderer.resize(
    this.world_el.clientWidth,
    this.world_el.clientHeight
  );
};

window.addEventListener('resize', resize);
resize();

this.world_el.appendChild(this.pixi_app.view);

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

const set_location = async () => {

  const location = store.state.active_career.location;
  const location_name = store.state.locations[location].name;
  const location_slug = location_name.toLowerCase().replace(/ /g, '-');

  const texture = await load_texture(`/static/${ location_slug }.png`);
  const sprite = new PIXI.Sprite(texture);
  this.pixi_app.stage.addChild(sprite);
};

const set_truck = () => {

};

store.state.on('update', () => {
  set_location();
  set_truck();
});
