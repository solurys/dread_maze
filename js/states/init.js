class InitState extends Phaser.State {
  preload(game) {
    // preload des classes
    Swordsman.preload(game);
    // l'entityManager gère la logique de jeu
    game.entityManager = new EntityManager(game);
  }
  create(game) {
    // passage à la préparation du dongeon
    game.state.start('preparation', false);
  }
}
