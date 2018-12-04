import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from '../shared/recipe.model';
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Shark Cupcakes ;O',
      'This just looks good. Just stare at it.',
      'https://hips.hearstapps.com/vidthumb/images/delish-shark-attack-cupcakes-still001-1532037157.jpg?crop=1xw:1xh;center,top&resize=768:*',
      [
        new Ingredient('Vanilla Cake Mix', 1),
        new Ingredient('White Chocolate Chips', 2),
        new Ingredient('Black food coloring', 1),
        new Ingredient('Strawberry sauce', 1),
        new Ingredient('Blue food coloring', 1),
        new Ingredient('Whipped topping', 3)
      ]
    ),

      new Recipe(
        'Frozen Hot Cocoa ;O',
        'This is simply just great to look at. Just stare at it for a long long time.',
        'https://hips.hearstapps.com/vidthumb/images/delish-baileys-frozen-hot-chocolate-still002-1532018181.png?crop=1xw:1xh;center,top&resize=768:*',
        [
          new Ingredient('Chocolate milk', 1),
          new Ingredient('Packets hot cocoa mix', 2),
          new Ingredient('Whipped cream', 1),
          new Ingredient('Chocolate syrup', 1),
          new Ingredient('Chocolate shavings', 3)
        ]
      )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice())
  }
}
