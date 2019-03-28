class Action {
    constructor(hud) {
    	// Demander en paramètre le nom du sprite
        this.buttonO = game.add.button(1, 208, 'p1', this.putOrc, this, 2, 1, 0);
        this.buttonS = game.add.button(1, 245, 'p2', this.putSkeleton, this, 2, 1, 0);
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

}