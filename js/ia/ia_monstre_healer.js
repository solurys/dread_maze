// classe IA de base

class MonstreHealer extends IA {
    // self : entité controllée par l'ia
    constructor(self, config = {}) {
      // extraction des paramètres
      // avec des valeurs par défaut
      let {
        speed = 100,
        range_attack = 30,
        range_detection = 100
      } = config;

      super(self);
      this.etat = 1; // état inerte par défaut
      this.target = null;
      this.destination = {x: this.self.x, y: this.self.x};
      this.speed = speed;
      this.range_attack = range_attack;
      this.range_detection = range_detection;
      //ajouter ici attributs de sort
      this.spells = null;
      /*
      {
        soutien: ShieldPlus,
        heal: MIDHeal,
        resurection: Resurection
      }
      */
    }

    selectTypeSpell() {

        // utiliser this.targets pour savoir sur qui faire l'action
        if(this.selectSpellHeal()) {
            //selection spell heal
        } else if(this.selectSpellRevive()) {
            //selection spell revive
        } else if(this.selectSpellSupport()) {
            //selection spell support
        } else if(this.selectNormalAttack()) {
            //selection attaque normal
        } else {
            //ne rien faire
            this.targets = [];
        }
    }

    selectSpellRevive() {
        let entities = filterTargets(this, [this.game.entityManager.monsters])
        .sameRoom()
        .dead() //récupération des entités mortes
        .sortByDistance() //mort le plus proche
        .toArray();

        this.targets = entities;

        return this.targets !== undefined;
    }

    selectSpellHeal() {
        let  entities = filterTargets(this, [this.game.entityManager.monsters])
        .sameRoom() // monstre dans la même salle
        .alive() // monstre en vie
        .nearby(this.range_detection) // monstre dans la zone de détection
        .toArray();

        this.targets = entities;

        let pv = 0;
        let pvmax = 0;
        for (let element of entities) {
            pv += element.health;
            pvmax += element.maxHealth;
        }

        return entities.length > 0 && pv < pvmax/2;
    }

    selectSpellSupport() {
        let  entities = filterTargets(this, [this.game.entityManager.monsters])
        .sameRoom() // monstre dans la même salle
        .alive() // monstre en vie
        .nearby(this.range_detection) // monstre dans la zone de détection
        .toArray();

        this.targets = entities;

        return entities.length > 2;
    }

    selectNormalAttack() {
       let entities = filterTargets(this, [this.game.entityManager.adventurers])
      .sameRoom() // même salle
      .alive() // en vie
      .sortByDistance() //le plus proche
      .toArray();

      return entities.length > 0;
    }

    mouvementAleatoire() {
      var epsilon = 10;
      var pos = {x: this.centerX, y: this.centerY};
      if (Math.abs(this.destination.x - pos.x) < epsilon && Math.abs(this.destination.y - pos.y) < epsilon){
        this.destination = {x: Phaser.Math.between(0,800), y: Phaser.Math.between(0,600)}; //limitation à la salle -- TODO
      }
      else {
        var vel = Vector.from_to(pos, this.destination).normalize().multiply(this.speed);
        this.walk(vel);
      }
    }

    update() {
        this.selectTypeSpell();
        if (this.targets.length == 0) {
            this.mouvementAleatoire();
        }
    }

    debug() {
      var s = this.self;

      var rd = this.range_detection;
      var ra = this.range_attack;

      var rec_rd = new Phaser.Rectangle(s.left, s.top, s.width, s.height);
      rec_rd.inflate(rd, rd);
      var rec_ra = new Phaser.Rectangle(s.left-ra, s.top-ra, s.width+ra*2, s.height+ra*2);
      rec_ra.inflate(ra,ra);

      var dg = this.self.game.debug;
      dg.rectangle(rec_rd, 'yellow', false);
      dg.rectangle(rec_ra, 'red', false);
      switch(this.etat) {
        case 1:
          var dest = this.destination;
          var line_dest = new Phaser.Line(s.centerX, s.centerY, dest.x, dest.y);
          dg.geom(line_dest, 'black');
          break;
        case 2:
          var t = this.target;
          var line_target = new Phaser.Line(s.centerX, s.centerY, t.centerX, t.centerY);
          dg.geom(line_target, 'red');
          break;
      }
    }
  }
