import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './interfaces/recipe';
@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  baseUrl: string = 'https://api.edamam.com/search';
  key: string = '62810a10d7ad00ff9beda1f3f8312659';
  id: string = 'dffcf630';
  favorites: Recipe[] = [];
  constructor(private edamam: HttpClient) {}

  getRecipes = (searchTerm: string): any => {
    return this.edamam.get(this.baseUrl, {
      params: { app_key: this.key, app_id: this.id, q: searchTerm },
    });
  };

  getRecipesWithCalories = (searchTerm: string, calorieRange: string): any => {
    console.log('get recipes service call');
    let url = ` {{}this.baseUrl}?app_key={{this.key}}&app_id={{this.id}}&q={{searchTerm}}&diet={{diet.toLowerCase()}}`;
    console.log(url);
    return this.edamam.get(this.baseUrl, {
      params: {
        app_key: this.key,
        app_id: this.id,
        q: searchTerm,
        calories: calorieRange,
      },
    });
  };

  getRecipesWithDiet = (searchTerm: string, diet: string): any => {
    console.log('get recipes service call for diet');
    return this.edamam.get(this.baseUrl, {
      params: {
        app_key: this.key,
        app_id: this.id,
        q: searchTerm,
        diet: diet.toLowerCase(),
      },
    });
  };

  addToFavorites = (recipe: Recipe) => {
    this.favorites.unshift(recipe);
    console.log(this.favorites);
  };

  getFavorites = () => {
    return this.favorites;
  };

  removeFromFavorites = (index: number) => {
    this.favorites.splice(index, 1);
    console.log('length of spliced array', this.favorites.length);
  };
}
