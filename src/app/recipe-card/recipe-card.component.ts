import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe, Hit } from '../interfaces/recipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
})
export class RecipeCardComponent implements OnInit {
  @Input() indexRef: number;
  @Input() record: Recipe;
  @Input() favoriteArray: Hit;
  @Output() favorite = new EventEmitter<void>();

  showFlag: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  addToFavorites = () => {
    console.log(' Inside recipe card TS : indexRef is ');

    this.favorite.emit();
  };

  ngOnInit(): void {}
  toggle = (showFlag: boolean) => {
    this.showFlag = !showFlag;
  };
}
