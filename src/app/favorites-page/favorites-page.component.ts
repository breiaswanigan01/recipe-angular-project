import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../interfaces/recipe';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css'],
})
export class FavoritesPageComponent implements OnInit {
  favoriteRecipes: Recipe[] = [];
  showIndex: number;
  @Output() quickView = new EventEmitter<number>();
  constructor(private service: RecipesService) {}

  ngOnInit(): void {
    this.favoriteRecipes = this.service.getFavorites();
  }
  showDetails = (index: number) => {
    this.quickView.emit(index);
  };
  setShowIndex = (index: number) => {
    this.showIndex = index;
    console.log(this.showIndex);
  };
  closeView = () => {
    this.showIndex = -1;
  };
}
