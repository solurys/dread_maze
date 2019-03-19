class Monster extends Actor {
  constructor(game, config) {

    super(game, config);


    // Pour la capture des mouvements / actions de la souris (Placement des monstres)
  	// Bon emplacement ?
  	game.input.mouse.capture = true;  

    this.alpha = 0.5;
    this.placer = false;
  }

  static preload(game) {
    Orc.preload(game);
    Skeleton.preload(game);
  }

  update(game){

  	if(!this.placer){
  		this.x = this.game.input.x;
  		this.y = this.game.input.y;
  	}

  	if(this.game.input.activePointer.leftButton.justPressed()){
  		this.placer = true;
  		this.alpha = 1;
  	}
  	

  	super.update(this.game);
  }
}
