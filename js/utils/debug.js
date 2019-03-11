window.gameDebug = window.gdb = {
  ia: false,
  body: false,

  // draw() body
  bodyColor: {
    adventurers: 'rgba(252, 178, 7, 0.2)',
    monsters: 'rgba(255, 0, 0, 0.2)',
    bosses: 'rgba(0, 255, 0, 0.2)',
    projectiles: 'rgba(0, 0, 255, 0.2)',
    traps: 'rgba(0, 0, 0, 0.2)',
    filled: true
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
    cm: game.cameraManager
  }},

  // click de souris qui est controllé par le <select> sur la page
  onClick: function(pointer) {
    // récuperer l'entité clickée
    var pos = pointer.position;
    var zone = new Phaser.Rectangle(pos.x, pos.y, 1, 1);
    var groups = Object.values(this.pgr());
    var target = filterTargets(zone, groups).nearby(20).sortByDistance().first();
    // récupérer l'action à faire
    var select = document.getElementById("click-debug");
    var action = select.options[select.selectedIndex].getAttribute("name");
    // faire l'action
    switch(action) {
      case 'no-op': break;
      case 'console': console.log('click :', this.findEntityMessage(target), target); break;
      case 'kill': target.kill(); console.log('killer click :', this.findEntityMessage(target), target); break;
    }
  },

  // petit message pour savoir où se trouve l'entité dans les groupes
  findEntityMessage: function(entity) {
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

    return 'gdb.gr().'+group+'['+index+'] === ';
  },

  reviveAll: function() {
    var groups = Object.values(this.pgr());
    for (var gr of groups) {
      gr.reviveAll();
    }
  },

  init: function() {
    game.input.onDown.add(this.onClick, this);
  },

  // rendu du debug sur le jeu (appellé dans renderer() des states)
  draw: function() {
    var groups = Object.values(this.pgr());
    for (var gr of groups) {
      gr.forEach(entity => {
        if (entity.debugEnabled) {
          if (this.ia && entity.alive && entity.ia) { entity.ia.debug(); }
          if (this.body) { game.debug.body(entity, this.bodyColor[gr.name], this.bodyColor.filled); }
        }
      });
    }
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
  }

}
