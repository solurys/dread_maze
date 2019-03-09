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
        if (entity.debugEnabled) {
          if (this.ia) entity.ia.debug();
          if (this.body) game.debug.body(entity, bodyColor[gr.name], bodyColor.filled);
        }
      });
    }
  },

  select: function(variable /* optionnel */) {
    var em = game.entityManager;
    var groups = [em.adventurers, em.monsters, em.bosses, em.projectiles, em.traps];
    var listener = function(pointer) {
      var pos = pointer.position;
      var zone = new Phaser.Rectangle(pos.x, pos.y, 1, 1);
      var chosen = filterTargets(zone, groups).nearby(20).sortByDistance().first();
      if (chosen instanceof Entity) {
        console.log('Here I am : ', chosen);
        if (variable !== undefined) {
          window[variable] = chosen;
          console.log('I am stored in "' + variable + '"');
        }
        game.input.onDown.remove(listener);
      }
    }
    game.input.onDown.add(listener);
    console.log('click me !');
    if (variable === undefined)
      return 'waiting...';
    else
      return 'waiting, result will be stored in "' + variable + '"';
  },

  traceMethod: function(obj, methodName, cond = (() => true), tracer, postTrace = true) {
    if (tracer === undefined) {
      if (postTrace) {
        tracer = (function (ret, ...args) {
          console.log({methodName, ret, this:this, args});
        });
      }
      else {
        tracer = (function (...args) {
          console.log({methodName, this:this, args});
        });
      }
    }
    var method = obj[methodName];
    obj[methodName] = function(...args) {
      if (!postTrace && cond.call(this, ...args)) tracer.call(obj, ...args);
      var ret = method.call(obj, ...args);
      if (postTrace && cond.call(this, ret, ...args)) tracer.call(obj, ret, ...args);
    }
  },

  traceAttribute: function(obj, attrName, cond = (() => true), tracer) {
    if (tracer === undefined) {
      tracer = (function (event, value) {
        console.log({attrName, this:this, event, value, newValue});
      });
    }
    var value = obj[attrName];
    Object.defineProperty(obj, attrName, {
      get: function() {
        tracer.call(obj, 'get', value, undefined);
        return value;
      },
      set: function(newValue) {
        tracer.call(obj, 'set', value, newValue);
        return value = newValue;
      }
    });
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
