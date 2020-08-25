import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../interfaces/recipe';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Input() recipesRef: Recipe[];
  @Output() quickView = new EventEmitter<number>();

  favoriteArray: Recipe[] = [];
  constructor(private service: RecipesService) {}

  ngOnInit(): void {}

  addToFavorites = (recipe: Recipe) => {
    console.log('addToFav');
    this.service.addToFavorites(recipe);
  };
  showDetails = (index: number) => {
    this.quickView.emit(index);
  };
}
