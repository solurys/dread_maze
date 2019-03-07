FilterTargets permet de choisir rapidement selon une liste de critère une ou plusieurs cibles.  
Elle prend pour paramètres une entité *self* (soi-même), et un tableau de cibles.  
Ce tableau peut contenir des entités, des groupes Phaser, ou des tableaux d'entités.  
L'entité *self* est automatiquement exclue des cibles.

Pour construire une requête avec filterTargets, il faut généralement spécifier dans l'ordre :
- les filtres (réduit le nombre de possibilités)
- les tris (donne un ordre)
- l'accesseur (juste le premier ou tout le tableau)

Par exemple, pour avoir l'aventurier le plus proche, distant de moins de 200px,
relativement à *myEntity* :
```js
var target =
 filterTargets(myEntity, [entityManager.adventurers])
  // filtres
  .alive() // en vie, pas mort
  .nearby(200) // distant de moins de 200px
  // tris
  .sortByDistance() // le plus proche devient le premier
  // accesseur
  .first();
```

Si aucune cible ne correspond, target aura la valeur *undefined*
(ou dans le cas de .toArray(), un tableau vide).  
Il faut donc tester la valeur de target avant de l'utiliser :
```js
if (target !== undefined) {
// Attaquer la cible ? Soigner un allié ?
}
```

On peut aussi mélanger les résultats pour avoir un aventurier aléatoire :
```js
var aventurierAleatoire =
 filterTargets(myEntity, [entityManager.adventurers])
  .alive()
  .shuffle()
  .first();
```

Si on spécifie plusieurs tris, il seront effectués par priorité.  
On peut par exemple trier par hp, et s'il ont les même hp par distance :
```js
var target_array =
 filterTargets(myEntity, [entityManager.adventurers])
  .alive()
  .sortByStat('hp')
  .sortByDistance()
  .toArray();
```
