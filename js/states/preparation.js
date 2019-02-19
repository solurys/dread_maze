class PreparationState extends Phaser.State {
  create(game) {
    // temporaire
    var sw1 = game.entityManager.add(new Swordsman(game, 0, 0));
    sw1.ia = new KeyboardArrowControl(sw1);

    //var sw2 = game.entityManager.add(new Swordsman(game, 100, 100));
    //sw2.ia = new KeyboardArrowControl(sw2);

    var sw3 = game.entityManager.add(new Swordsman(game, 200, 200));
    sw3.ia = new KeyboardZQSDControl(sw3);

    game.state.start('fight', false);
  }
  update(game) {
    // le joueur mets en place le dungeon
  }
}
