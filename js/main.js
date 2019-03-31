game = new Phaser.Game(800, 610, Phaser.CANVAS, 'container');

gameDebug.takeSampleGameFields();

game.state.add('init', InitState);
game.state.add('menu', MenuState);
game.state.add('preparation', PreparationState);
game.state.add('fight', FightState);
game.state.add('fin', FinState);

game.state.start('init');
