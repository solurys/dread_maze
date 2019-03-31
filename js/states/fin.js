class FinState extends Phaser.State {
    init(result) {
        // 'win' ou 'dead'
        this.result = result;
    }

    preload(game){
        game.load.image('dead', 'sprites/HUD/fondDead.png');
        game.load.image('win', 'sprites/HUD/fondWin.png');
        game.load.image('restart', 'sprites/Menu/buttonRestart.png');
        game.load.image('return', 'sprites/Menu/buttonRetour.png');
        game.load.image('BackPopup', 'sprites/Menu/BackPopup.png');
        game.load.image('buttonClose', 'sprites/Menu/close.png');
    }

    win() {
        game.add.sprite(0,0,'win');
        //Text Popup
        //var win = "YOU ARE THE WINNER !"
        //
        //var styleWin = {
        //  font: "bold 170px flipps",
        //  fill: "#6ab04c" //green
        //};
        //
        //var textPopFin = game.add.text(-1500, -400, win, styleWin);

        //init return button
        //var returnButton = game.make.sprite(500,200, 'return');
        //returnButton.inputEnabled = true;
        //returnButton.input.priorityID = 1;
        //returnButton.events.onInputDown.add(game.state.start('menu',true), this);

        //init continue button
        //var continueButton = game.make.sprite(-500,200, 'buttonClose');
        //continueButton.inputEnabled = true;
        //continueButton.input.priorityID = 1;
        //continueButton.events.onInputDown.add(game.state.start('preparation',true), this);

        //popupFin.addChild(continueButton);

        this.buttonRetour = game.add.button(300, 520, 'back', () => {game.state.start('menu',true)}, this, 2, 1, 0);
        this.buttonRestart = game.add.button(400, 520, 'restart', () => {game.state.start('preparation',true)}, this, 2, 1, 0);
    }

    dead() {
      game.add.sprite(0,0,'dead');
      //  //Text Popup
      //  var mort = "YOU ARE DEAD !"

      //  var styleDeath = {
      //    font: "bold 200px flipps",
      //    fill: "#e74c3c" //red
      //  };

      //var textPopFin = game.add.text(-1200, -400, mort, styleDeath);

      //init return button
      //var returnButton = game.make.sprite(500,200, 'return');
      //returnButton.inputEnabled = true;
      //returnButton.input.priorityID = 1;
      //returnButton.events.onInputDown.add(game.state.start('menu',true), this);

      //init button restart
      //var restartButton = game.make.sprite(-500,200, 'restart');
      //restartButton.inputEnabled = true;
      //restartButton.input.priorityID = 1;
      //restartButton.events.onInputDown.add(game.state.start('preparation',true), this);

      //popupFin.addChild(restartButton);

      this.buttonRetour = game.add.button(290, 300, 'back', () => {game.state.start('menu',true)}, this, 2, 1, 0);
      this.buttonRestart = game.add.button(400 , 300, 'restart', () => {game.state.start('preparation',true)}, this, 2, 1, 0);
    }

    create(game) {

      //Init popupFin
      //var popupFin = game.add.sprite(400, 300, 'BackPopup');
      //popupFin.alpha = 1;
      //popupFin.anchor.set(0.5);
      //popupFin.scale.set(0.2);
      //popupFin.inputEnabled = true;
      //popupFin.input.enableDrag();
      //popupFin.kill();

      //recup valeur pour pos. close button
      //var widthPopFin = popupFin.width + 800;
      //var heightPopFin = popupFin.height + 650;

      //init close button
      //var closeButtonFin = game.make.sprite(widthPopFin, -heightPopFin, 'buttonClose');
      //closeButtonFin.inputEnabled = true;
      //closeButtonFin.input.priorityID = 1;
      //closeButtonFin.events.onInputDown.add(close, this);

      // Le boss est mort
      if(this.result == 'win'){
        this.win();
      }
      else if (this.result == 'dead') {
        this.dead();
      }

      //popupFin.addChild(textPopFin);
      //popupFin.addChild(closeButtonFin);
      //popupFin.addChild(returnButton);

      this.buttonRetour.scale.x = 0.2;
      this.buttonRetour.scale.y = 0.2;

      this.buttonRestart.scale.x = 0.25;
      this.buttonRestart.scale.y = 0.25;
    }
}
