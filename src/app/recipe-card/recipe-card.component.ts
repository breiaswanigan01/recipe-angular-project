import { Component, OnInit, Input } from '@angular/core';
import { Recipe, Hit } from '../interfaces/recipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
})
export class RecipeCardComponent implements OnInit {
  @Input() record: Recipe;
  @Input() favoriteArray: Hit;
  index: number;
  constructor(private route: ActivatedRoute, private router: Router) {}

  addToFavorites = () => {
    this.router.navigate(['search'], {
      queryParams: {
        index: this.index,
      },
    });
  };

  ngOnInit(): void {}
}
