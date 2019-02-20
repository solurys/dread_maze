game = new Phaser.Game(800, 600, Phaser.CANVAS);

game.state.add('init', InitState);
game.state.add('preparation', PreparationState);
game.state.add('fight', FightState);

game.state.start('init');