class PreparationState extends Phaser.State {
  create(game) {
    // temporaire

    // var sw1 = game.entityManager.add(new Swordsman(game, 0, 0));
    // sw1.ia = new KeyboardArrowControl(sw1);

    var sw2 = game.entityManager.add(new Swordsman(game, 100, 100));
    sw2.ia = new KeyboardArrowControl(sw2);

    //var and = game.entityManager.add(new Andrax(game, 100, 100));

     // var sw4 = game.entityManager.add(new Swordsman(game, 300, 300));
     //  sw4.ia = new  MonstreCac(sw4);//FollowEnemy(sw4, [game.entityManager.adventurers]);

      var orc1 = game.entityManager.add(new Orc(game, 300, 300));


       var ske1 = game.entityManager.add(new Skeleton(game, 400, 400));
        ske1.ia = new  MonstreCac(ske1, 30, 200, 220); // vitesse 50

    game.state.start('fight', false);
  }
  update(game) {
    // le joueur mets en place le dungeon
  }
}
