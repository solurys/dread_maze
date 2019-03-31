class HUDGold {
    constructor() {
        this.textGold = game.add.text(410,540, "", {fill:"#CCCC00"});
    }
    static preload() {
        game.load.image('gold', 'sprites/HUD/gold.png');
    }
    update() {
        this.textGold.setText(game.varGold);
    }
}
