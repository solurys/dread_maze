class PreparationState extends Phaser.State {
  preload(game) {
    game.tiledmapManager = new TiledmapManager(game, {
      map: 'tiled/pièce.json',
      tileset: ['tiled/cute_lpc.png', 'tiled/dungeon_tiles.png', 'tiled/Dungeon_Tileset.png', 'tiled/logic.png']
    });
    game.entityManager = new EntityManager(game);
    game.roomManager = new RoomManager(game);
    var room = 'room';

    // game.roomManager.setRooms(4, 3, [
    //   [room, null, null],
    //   [room, room, room],
    //   [null, room, null],
    //   [null, room, null]
    // ]);

    game.roomManager.setRooms(1,1,[[room]]);

    game.cameraManager = new CameraManager(game, 0, 0);
  }
  create(game) {
    game.tiledmapManager.createLayers();
    // Création de l'HUD
    var h = new HUD(game);

    // temporaire

    // var sw1 = game.entityManager.add(new Swordsman(game, 0, 0));
    // sw1.ia = new KeyboardArrowControl(sw1);

    //var sw2 = game.entityManager.add(new Swordsman(game, 100, 100));
    //sw2.ia = new KeyboardArrowControl(sw2);

    var and = game.entityManager.add(new Andrax(game, 100, 100));
    game.cameraManager.follow(and);

    // var sw4 = game.entityManager.add(new Swordsman(game, 300, 300));
    //  sw4.ia = new  MonstreCac(sw4);//FollowEnemy(sw4, [game.entityManager.adventurers]);

    // Mise en commentaire car création via bouton IG
    /*var orc1 = game.entityManager.add(new Orc(game, 300, 300));*/

    var pal1 = game.entityManager.add(new Paladin(game, 666 , 600));

    // Mise en commentaire car création via bouton IG
	/*var ske1 = game.entityManager.add(new Skeleton(game, 400, 400));*/



    game.state.start('fight', false);
  }
  update(game) {
    // le joueur met en place le dungeon
  }
}
