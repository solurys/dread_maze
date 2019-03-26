class Boss extends Actor {
  constructor(game, config) {
    super(game, config);
    this.pv = game.add.text(280,540, "");
    this.mana = game.add.text(280,570,"")
  }

  static preload(game) {
    Andrax.preload(game);
  }

  update(game){
  	if(this.health < 0){
  		this.health = 0;
  	}
  	this.pv.setText(this.health + "/" + this.maxHealth);
  	
  	if(this.mp < 0){
  		this.mp = 0;
  	}
  	this.mana.setText(this.mp + "/" + this.mpMax);
  	
  	super.update(game);
  }
}

// Regarder pour barre
// http://naivedev.blogspot.com/2016/06/phaser-experiment-making-health-bar.html