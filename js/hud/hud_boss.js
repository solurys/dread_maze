class HUDBoss {
    constructor() {
        // PV
        this.pv = game.add.text(280,540, "", {fill: "#8A0808"});
        this.spritePV = game.add.sprite(245,537,'heart');

        // MP
        this.mana = game.add.text(280,570,"", {fill: "#0B0B61"})
        this.spriteMana= game.add.sprite(245,566,'mana');
    }
    static preload() {
        // HUD du boss
        game.load.image('heart', 'sprites/HUD/heart.png');
        game.load.image('mana', 'sprites/HUD/mana.png');
    }
    update() {
        var boss = game.boss;
        this.pv.setText(boss.health + "/" + boss.maxHealth);
        this.mana.setText(boss.mp + "/" + boss.mpMax);
    }
}
