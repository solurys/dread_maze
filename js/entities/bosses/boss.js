class Boss extends Actor {
  constructor(game, config) {
    super(game, config);
    
    // PV
    this.pv = game.add.text(280,540, "", {fill: "#8A0808"});
    this.spritePV = game.add.sprite(245,537,'heart');

    // MP
    this.mana = game.add.text(280,570,"", {fill: "#0B0B61"})
    this.spriteMana= game.add.sprite(245,566,'mana');
  }

  static preload(game) {
    Andrax.preload(game);
        game.load.image('heart', 'sprites/HUD/heart.png');
        game.load.image('mana', 'sprites/HUD/mana.png');
  }

  update(game){
    
    if(this.health <= 0){
      this.health = 0;
      this.game.state.start('fin', true); 
    }

    this.pv.setText(this.health + "/" + this.maxHealth);
    
    // Stocke les PV du boss pour les réutiliser après dans FinState
    this.game.varHealth = this.health;
    
    if(this.mp < 0){
      this.mp = 0;
    }
    this.mana.setText(this.mp + "/" + this.mpMax);

  	super.update(game);
  }
}

// Regarder pour barre
// http://naivedev.blogspot.com/2016/06/phaser-experiment-making-health-bar.html