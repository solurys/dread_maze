class HUD {
    constructor(game) {
        // Paramètre pour le nombre de pièges etc ?
        this.sprite = game.add.sprite(0,0,'hud');
        this.piege = [];
        this.piege.push(new Action());
    }

    static preload(game) {
        game.load.image('hud', 'sprites/HUD/hud.png');

        // Charger les sorts ici ? - Test avec p . numéro du piège dans action
        game.load.image('p1', 'sprites/HUD/Piege1.png');
        
    }

}