class Action {
    constructor(hud) {
        this.buttonOrc = game.add.button(1, 208, 'm1', this.putOrc, this, 2, 1, 0);
        this.buttonSkeleton = game.add.button(1, 245, 'm2', this.putSkeleton, this, 2, 1, 0);
        this.buttonWizard = game.add.button(1, 282, 'm3', this.putWizard, this, 2, 1, 0);
        this.buttonSpike = game.add.button(767, 208, 'p1', this.putSpike, this, 2, 1, 0);
    }

    putOrc() {
    	// Coordonnées sans importance
        if(game.state.current == "preparation" && game.varGold >= Orc.price){
    	   game.entityManager.add(new Orc(game, 0, 0));
           game.varGold -= Orc.price;
        }
	}

	putSkeleton() {
    	// Coordonnées sans importance
        if(game.state.current == "preparation" && game.varGold >= Skeleton.price){
        	game.entityManager.add(new Skeleton(game, 0, 0));
            game.varGold -= Skeleton.price;
	   }
    }

    putWizard() {
        // Coordonnées sans importance
        if(game.state.current == "preparation" && game.varGold >= Blackwizard.price){
            game.entityManager.add(new Blackwizard(game, 0, 0));
            game.varGold -= Blackwizard.price;
        }
    }

    putSpike() {
        // Coordonnées sans importance
        if(game.state.current == "preparation" && game.varGold >= Spike.price){
            game.entityManager.add(new Spike(game, 0, 0));
            game.varGold -= Spike.price;
        }
    }

}
