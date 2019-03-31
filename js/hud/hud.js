class HUD {
    constructor(game) {
        // Demander un paramètre pour le nombre de type de pièges et de monstres
        // Faire le HUD en fonction du nombre (ajout petit à petit) ou faire des HUD type
        // Revoir le nom des variables
        // Faire héritage pour piège et monstre
        this.sprite = game.add.sprite(0,0,'hud');
        this.placementBar = new PlacementBar();
        this.hudBoss = new HUDBoss();
        this.hudGold = new HUDGold();

        // Regarder pour barre
        // http://naivedev.blogspot.com/2016/06/phaser-experiment-making-health-bar.html
    }

    static preload(game) {
        game.load.image('hud', 'sprites/HUD/hud.png');

        PlacementBar.preload(game);
        HUDBoss.preload(game);
        HUDGold.preload(game);
    }

    update() {
        this.placementBar.update();
        this.hudBoss.update();
        this.hudGold.update();
    }

}
