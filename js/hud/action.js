class Action {
    constructor(hud) {
    	// Demander en paramètre le nom du sprite
        this.buttonO = game.add.button(1, 208, 'p1', this.putOrc, this, 2, 1, 0);
        this.buttonS = game.add.button(1, 245, 'p2', this.putSkeleton, this, 2, 1, 0);
        this.buttonS = game.add.button(1, 282, 'p3', this.putWizard, this, 2, 1, 0);

    }

    putOrc() {
    	// Coordonnées sans importance
    	game.entityManager.add(new Orc(game, 0, 0));
	}

	putSkeleton() {
    	// Coordonnées sans importance
    	game.entityManager.add(new Skeleton(game, 0, 0));
	}

    putWizard() {
        // Coordonnées sans importance
        game.entityManager.add(new Blackwizard(game, 0, 0));
    }

}
