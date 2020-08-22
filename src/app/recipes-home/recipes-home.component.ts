import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../interfaces/recipe';

@Component({
  selector: 'app-recipes-home',
  templateUrl: './recipes-home.component.html',
  styleUrls: ['./recipes-home.component.css'],
})
export class RecipesHomeComponent implements OnInit {
  @Input() recipeRef: Recipe[];
  constructor() {}

  getRecipes = (recipe: Recipe[]) => {
    console.log('getRecipes');
    console.log(recipe);
  };

  ngOnInit(): void {}
}
