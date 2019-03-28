class HUD {
    constructor(game) {
        // Demander un paramètre pour le nombre de type de pièges et de monstres
        // Faire le HUD en fonction du nombre (ajout petit à petit) ou faire des HUD type
        // Revoir le nom des variables
        // Faire héritage pour piège et monstre
        this.sprite = game.add.sprite(0,0,'hud');
        this.piege = [];
        this.piege.push(new Action());
    }

    static preload(game) {
        game.load.image('hud', 'sprites/HUD/hud.png');

        // Charger tous les sorts ici
        game.load.image('p1', 'sprites/HUD/orc.png');
        game.load.image('p2', 'sprites/HUD/skeleton.png');
        game.load.image('p3', 'sprites/HUD/wizard.png');
    }

}
