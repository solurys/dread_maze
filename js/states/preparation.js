class PreparationState extends Phaser.State {
  create(game) {
    // temporaire

    // var sw1 = game.entityManager.add(new Swordsman(game, 0, 0));
    // sw1.ia = new KeyboardArrowControl(sw1);

    //var sw2 = game.entityManager.add(new Swordsman(game, 100, 100));
    //sw2.ia = new KeyboardArrowControl(sw2);

    var sw3 = game.entityManager.add(new Swordsman(game, 100, 100));
    sw3.ia = new KeyboardZQSDControl(sw3);

     // var sw4 = game.entityManager.add(new Swordsman(game, 300, 300));
     //  sw4.ia = new  MonstreCac(sw4);//FollowEnemy(sw4, [game.entityManager.adventurers]);

      var orc1 = game.entityManager.add(new Orc(game, 300, 300));
       orc1.ia = new  MonstreCac(orc1, 50); // vitesse 50
       //FollowEnemy(sw4, [game.entityManager.adventurers]);

    game.state.start('fight', false);
  }
  update(game) {
    // le joueur mets en place le dungeon
  }
}
