class InitState extends Phaser.State {
  preload(game) {
    // preload des classes
    Entity.preload(game);
    HUD.preload(game);
    // l'entityManager gère la logique de jeu
    game.entityManager = new EntityManager(game);
    
    game.stage.backgroundColor = "#4488AA";

  }
  create(game) {
    // passage à la préparation du dongeon
    game.state.start('preparation', false);

    // Création de l'HUD
    h = new HUD(game);
  }
}
