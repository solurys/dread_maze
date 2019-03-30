window.gameDebug = window.gdb = {
  // options de dessin de debug draw()
  ia: false,
  body: false,

  // draw() body
  bodyColor: {
    adventurers: 'rgba(252, 178, 7, 0.2)',
    monsters: 'rgba(255, 0, 0, 0.2)',
    bosses: 'rgba(0, 255, 0, 0.2)',
    projectiles: 'rgba(0, 0, 255, 0.2)',
    traps: 'rgba(0, 0, 0, 0.2)',
    teleporters: 'rgba(127, 127, 127, 0.2)',
    filled: true // rectangle plein (filled) ou tracé (stroke)
  },

  // les groupes d'entités
  gr: function() {
    if (game.entityManager === undefined)
      throw 'game.entityManager === undefined';
    else return {
      adv: game.entityManager.adventurers.children,
      mons: game.entityManager.monsters.children,
      boss: game.entityManager.bosses.children,
      proj: game.entityManager.projectiles.children,
      trap: game.entityManager.traps.children,
    };
  },

  // les groupes phaser d'entités
  pgr: function() {
    if (game.entityManager === undefined)
      throw 'game.entityManager === undefined';
    else return {
      adv: game.entityManager.adventurers,
      mons: game.entityManager.monsters,
      boss: game.entityManager.bosses,
      proj: game.entityManager.projectiles,
      trap: game.entityManager.traps
    };
  },

  // les managers
  m: function() { return {
    em: game.entityManager,
    rm: game.roomManager,
    cm: game.cameraManager,
    tm: game.tiledmapManager
  }},

  // initialisation pour gameVars()
  takeSampleGameFields: function() {
    this.phaserGameFields = Object.keys(game);
  },

  // sépare dans game les champs de phaser et nos variables
  // retourne nos variables
  gameVars: function() {
    let fields = Object.keys(game);
    let varKeys = fields.filter(f => this.phaserGameFields.includes(f) == false);
    let vars = {};
    varKeys.forEach(k => vars[k] = game[k]);
    return vars;
  },

  // click de souris qui est controllé par le <select> sur la page
  onClick: function(pointer) {
    // récuperer l'entité clickée
    var pos = {
      x: pointer.position.x + game.camera.position.x,
      y: pointer.position.y + game.camera.position.y
    };
    var zone = new Phaser.Rectangle(pos.x, pos.y, 1, 1);
    var groups = this.values(this.pgr());
    var target = filterTargets(zone, groups).nearby(20).sortByDistance().first();
    // récupérer l'action à faire
    var select = document.getElementById("click-debug");
    var action = select.options[select.selectedIndex].getAttribute("name");
    // faire l'action
    switch (action) {
      case 'no-op': break;
      case 'console':
        console.log('click :', this.findEntityMessage(target), target);
        break;
      case 'kill':
        if (target)
          target.kill();
        console.log('killer click :', this.findEntityMessage(target), target);
        break;
      case 'debug disable/enable':
        if (target) {
          target.debugEnabled = !target.debugEnabled;
          console.log('debug : '+target.debugEnabled);
        }
        break;
    }
  },

  // petit message pour savoir où se trouve l'entité dans les groupes
  findEntityMessage: function(entity) {
    if ((entity instanceof Entity) === false) return '???';

    var group = '';

    if (entity instanceof Adventurer) group = 'adv';
    else if (entity instanceof Monster) group = 'mons';
    else if (entity instanceof Boss) group = 'boss';
    else if (entity instanceof Projectile) group = 'proj';
    else if (entity instanceof Trap) group = 'trap';

    if (group === '') return '???';

    var g = this.gr()[group];
    var index = g.indexOf(entity);
    if (index === -1) return '(not in entityManager)';

    return 'gdb.gr().'+group+'['+index+']';
  },

  reviveAll: function() {
    var groups = this.values(this.pgr());
    for (var gr of groups) {
      gr.reviveAll();
    }
  },

  init: function() {
    game.input.onDown.add(this.onClick, this);
  },

  showCollisionLayer: function() {
    if (game.tiledmapManager && game.tiledmapManager.logicLayer.exists) {
      const layer = game.tiledmapManager.logicLayer;
      const group = game.tiledmapManager.layerGroup;
      group.bringToTop(layer);
      layer.alpha = 0.3;
      layer.renderable = true;
    }
  },

  hideCollisionLayer: function() {
    if (game.tiledmapManager && game.tiledmapManager.logicLayer.exists) {
      const layer = game.tiledmapManager.logicLayer;
      const group = game.tiledmapManager.layerGroup;
      group.sendToBack(layer);
      layer.renderable = false;
    }
  },

  // rendu du debug sur le jeu (appellé dans renderer() des states)
  draw: function() {
    var groups = this.values(this.pgr());

    if (this.body) { this.showCollisionLayer(); }
    else           { this.hideCollisionLayer(); }

    for (var gr of groups) {
      gr.forEach(entity => {
        if (entity.debugEnabled) {
          if (this.ia) { this.drawIA(entity); }
          if (this.body) { this.drawBody(entity, gr); }
        }
      });
    }

    if (this.body && game.tiledmapManager && game.tiledmapManager.tpLayerGroup) {
      game.tiledmapManager.tpLayerGroup.forEach(t => {
        game.debug.body(t, this.bodyColor.teleporters, this.bodyColor.filled);
      });
    }
  },

  drawIA: function(entity) {
    if (entity.alive && entity.ia) {
      entity.ia.debug();
    }
  },

  drawBody: function(entity, gr) {
    game.debug.body(entity, this.bodyColor[gr.name], this.bodyColor.filled);
  },

  /**** méthodes de débogage super puissantes ****/

  // appelle le debugger lorsque la méthode est appellée, **seulement** pour obj.
  // exemple : gdb.debugMethod(andrax, 'attack');
  // cond est optionnel, une fonction qui décide "debugger ou pas" (true / false)
  // cond prend pour argument les paramètres de la méthode appellée
  debugMethod: function(obj, methodName, cond = (() => true)) {
    var method = obj[methodName];
    obj[methodName] = function(...args) {
      if (cond.call(obj, ...args)) {
        debugger;
      }
      method.call(obj, ...args);
    }
  },

  // appelle le debugger lorsque l'attribut est modifié (par défaut), **seulement** pour obj.
  // exemple : gdb.debugAttribute(andrax, 'isAttacking');
  // cond est optionnel, une fonction qui décide "debugger ou pas" (true / false)
  // cond prend pour paramètre soit :
  // - 'get' (accès), value
  // - ou 'set' (modification), value, newValue
  debugAttribute: function(obj, attrName, cond = ((event) => event === 'set')) {
    var value = obj[attrName];
    Object.defineProperty(obj, attrName, {
      get: function() {
        if (cond.call(obj, 'get', value)) {
          debugger;
        }
        return value;
      },
      set: function(newValue) {
        if (cond.call(obj, 'set', value, newValue)) {
          debugger;
        }
        return value = newValue;
      }
    });
  },

  // un remplacement pour Object.values(obj)
  values: function(obj) {
    return Object.keys(obj).map(k => obj[k]);
  }

}
