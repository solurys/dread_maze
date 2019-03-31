class PlacementBar {
    constructor(hud) {
        this.buttonOrc = game.add.button(1, 208, 'm1', this.putOrc, this, 2, 1, 0);
        this.buttonSkeleton = game.add.button(1, 245, 'm2', this.putSkeleton, this, 2, 1, 0);
        this.buttonWizard = game.add.button(1, 282, 'm3', this.putWizard, this, 2, 1, 0);
        this.buttonSpike = game.add.button(767, 208, 'p1', this.putSpike, this, 2, 1, 0);
    }
    static preload(game) {
        // Charger tous les sorts ici
        game.load.image('m1', 'sprites/HUD/orc.png');
        game.load.image('m2', 'sprites/HUD/skeleton.png');
        game.load.image('m3', 'sprites/HUD/wizard.png');
        game.load.image('p1', 'sprites/HUD/spikeTrap.png');
    }
    update() {
      
    }
    place(entity) {
        // ajout dans entityManager à la fin
        game.add.existing(entity);

        entity.iaEnabled = false;
        entity.alpha = 0.5;

        function trackCursor(entity) {
            entity.x = game.input.x;
            entity.y = game.input.y;

            if(game.input.activePointer.leftButton.justPressed()){
                entity.alpha = 1;
                entity.iaEnabled = true;
                game.entityManager.add(entity);
                entity.onUpdate.remove(trackCursor, this);
            }
        }

        entity.onUpdate.add(trackCursor, this);
    }

    putOrc() {
    	  // Coordonnées sans importance
        if(game.state.current == "preparation" && game.varGold >= Orc.price){
    	     this.place(new Orc(game, 0, 0));
           game.varGold -= Orc.price;
        }
	  }

    putSkeleton() {
    	// Coordonnées sans importance
        if(game.state.current == "preparation" && game.varGold >= Skeleton.price){
        	  this.place(new Skeleton(game, 0, 0));
            game.varGold -= Skeleton.price;
        }
    }

    putWizard() {
        // Coordonnées sans importance
        if(game.state.current == "preparation" && game.varGold >= Blackwizard.price){
            this.place(new Blackwizard(game, 0, 0));
            game.varGold -= Blackwizard.price;
        }
    }

    putSpike() {
        // Coordonnées sans importance
        if(game.state.current == "preparation" && game.varGold >= Spike.price){
            this.place(new Spike(game, 0, 0));
            game.varGold -= Spike.price;
        }
    }

}
