var gameDebug = {
  ia: false,
  body: false,
  draw: function() {
    var em = game.entityManager;
    var groups = [em.adventurers, em.monsters, em.bosses, em.projectiles, em.traps];
    var bodyColor = {
      adventurers: 'rgba(252, 178, 7, 0.2)',
      monsters: 'rgba(255, 0, 0, 0.2)',
      bosses: 'rgba(0, 255, 0, 0.2)',
      projectiles: 'rgba(0, 0, 255, 0.2)',
      traps: 'rgba(0, 0, 0, 0.2)',
      filled: true
    };
    for (var gr of groups) {
      gr.forEach(entity => {
        if (this.ia) entity.ia.debug();
        if (this.body) game.debug.body(entity, bodyColor[gr.name], bodyColor.filled);
      });
    }
  },
  debugMethod: function(obj, methodName, cond = (() => true)) {
    var method = obj[methodName];
    obj[methodName] = function(...args) {
      if (cond.call(obj, ...args)) {
        debugger;
      }
      method.call(obj, ...args);
    }
  },
  debugAttribute: function(obj, attrName, cond = ((a) => a === 'set')) {
    var value = obj[attrName];
    Object.defineProperty(obj, attrName, {
      get: function() {
        if (cond.call(obj, 'get')) {
          debugger;
        }
        return value;
      },
      set: function(newValue) {
        if (cond.call(obj, 'set', newValue)) {
          debugger;
        }
        return value = newValue;
      }
    });
  }
}
