class Action {
    constructor(hud) {
    	// Demander en paramètre le nom du sprite
        this.button = game.add.button(1, 208, 'p1', this.putOrc, this, 2, 1, 0);
    }

    putOrc() {
    	// Coordonnées sans importance
    	game.entityManager.add(new Orc(game, 0, 0));
	}

}