import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../interfaces/recipe';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.css'],
})
export class FavoriteCardComponent implements OnInit {
  @Input() record: Recipe;
  @Input() index: number;
  @Output() quickView = new EventEmitter<void>();
  constructor(private service: RecipesService) {}

  ngOnInit(): void {}
  removeFromFavorites = (index: number) => {
    this.service.removeFromFavorites(index);
  };
  showDetails = () => {
    this.quickView.emit();
  };
}
