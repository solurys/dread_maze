class PreparationState extends Phaser.State {
  create(game) {
    // temporaire
    game.entityManager = new EntityManager(game);
    game.roomManager = new RoomManager(game);
    function ro() { // make room
      return {}; // x et y rempli par setRooms()
    }
    game.roomManager.setRooms(4, 3, [
      [ro(), null, null],
      [ro(), ro(), ro()],
      [null, ro(), null],
      [null, ro(), null]
    ]);

    game.roomManager.moveCameraTo(0, 0);

    // var sw1 = game.entityManager.add(new Swordsman(game, 0, 0));
    // sw1.ia = new KeyboardArrowControl(sw1);

    //var sw2 = game.entityManager.add(new Swordsman(game, 100, 100));
    //sw2.ia = new KeyboardArrowControl(sw2);

    var and = game.entityManager.add(new Andrax(game, 100, 100));

    // var sw4 = game.entityManager.add(new Swordsman(game, 300, 300));
    //  sw4.ia = new  MonstreCac(sw4);//FollowEnemy(sw4, [game.entityManager.adventurers]);

    var orc1 = game.entityManager.add(new Orc(game, 300, 300));
    var pal1 = game.entityManager.add(new Paladin(game, 666 , 600));


    var ske1 = game.entityManager.add(new Skeleton(game, 400, 400));

    // Création de l'HUD
    var h = new HUD(game);

    game.state.start('fight', false);
  }
  update(game) {
    // le joueur mets en place le dungeon
  }
}
