class InitState extends Phaser.State {
  preload(game) {
    // preload des classes
    Entity.preload(game);
    HUD.preload(game);
    // l'entityManager gère la logique de jeu
    game.stage.backgroundColor = "#4488AA";

  }
  create(game) {
    // passage à la préparation du dongeon
    game.state.start('menu', false);


  }
}
