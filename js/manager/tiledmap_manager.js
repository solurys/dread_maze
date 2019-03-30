class TiledmapManager {
  constructor (game, mapConfig) {
    this.game = game;
    const fn = path => path.split('/').slice(-1)[0].slice(0,-4); // filename without .png extension
    this.mapKey = fn(mapConfig.map);
    game.load.tilemap(fn(mapConfig.map), mapConfig.map, undefined, Phaser.Tilemap.TILED_JSON);
    this.tileset = [];
    for (let ts of mapConfig.tileset) {
      game.load.image(fn(ts), ts);
      this.tileset.push(fn(ts));
    }
  }
  createLayers() {
    const game = this.game;
    this.map = game.add.tilemap(this.mapKey);

    for (let ts of this.tileset) {
      this.map.addTilesetImage(ts);
    }

    // groupe du layer de téléportation
    this.tpLayerGroup = game.add.group();
    //this.tpLayerGroup.renderable = false; // invisible
    this.tpLayerGroup.enableBody = true;

    // createFromObjects(name, gid, key [, frame] [, exists] [, autoCull] [, group] [, CustomClass] [, adjustY] [, adjustSize])

    // création de bas en haut
    this.logicLayer = this.map.createLayer('logic');
    this.map.createFromObjects('teleport',1164,'teleporter',null,true,false,this.tpLayerGroup);
    this.floorLayer = this.map.createLayer('sol');
    this.decoLayer = this.map.createLayer('decoration');

    // layer de collision
    this.logicLayer.renderable = false; // invisible
    game.physics.arcade.enable(this.logicLayer);
    this.map.setCollisionByExclusion([0], true, this.logicLayer); // tout sauf les cases vides

    // téléporteurs immobiles
    this.tpLayerGroup.setAll('body.immovable', true);

    // groupe d'affichage
    this.layerGroup = game.add.group();
    this.layerGroup.name = 'map layers of ' + this.mapKey;

    // ajout de bas en haut
    this.layerGroup.add(this.logicLayer);
    this.layerGroup.add(this.floorLayer);
    this.layerGroup.add(this.decoLayer);
    this.layerGroup.add(this.tpLayerGroup);

    game.world.sendToBack(this.layerGroup);
  }
}
