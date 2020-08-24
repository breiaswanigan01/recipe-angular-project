import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../interfaces/recipe';

@Component({
  selector: 'app-recipes-home',
  templateUrl: './recipes-home.component.html',
  styleUrls: ['./recipes-home.component.css'],
})
export class RecipesHomeComponent implements OnInit {
  recipeArray: Recipe[];
  constructor() {}

  ngOnInit(): void {}

  getRecipes = (recipes: Recipe[]) => {
    console.log('getRecipes');
    console.log(recipes);

    this.recipeArray = recipes;
  };
}
