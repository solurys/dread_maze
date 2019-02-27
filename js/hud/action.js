class Action {
    constructor(hud) {
    	// Demander en paramètre le nom du sprite
        this.button = game.add.button(1, 208, 'p1', this.openWindow, this, 2, 1, 0);
    }

    openWindow() {    
    	console.log("bonjour");
    	game.entityManager.add(new Swordsman(game, 50, 40));
	}

}