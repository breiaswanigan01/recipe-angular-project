import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  baseUrl: string = 'https://api.edamam.com/search';
  key: string = 'b81783e4e8c02bddf0a814d3f11b57b8';
  id: string = '6dda1ca3';
  constructor(private edamam: HttpClient) {}

  getRecipes = (searchTerm: string): any => {
    return this.edamam.get(this.baseUrl, {
      params: { app_key: this.key, app_id: this.id, q: searchTerm },
    });
  };
}

const getRecipesForDietOptions = (dietOptions: string): any => {
  return this.baseUrl.dietOptions.get(this.selectedOptions, {
    params: { app_key: this.key, app_id: this.id, q: dietOptions },
  });
};
