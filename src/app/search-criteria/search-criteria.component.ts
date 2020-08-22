import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { NgForm } from '@angular/forms';
import { Recipe } from '../interfaces/recipe';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css'],
})
export class SearchCriteriaComponent implements OnInit {
  @Output() searchSubmit = new EventEmitter<Recipe[]>();

  searchResult: Recipe[];

  constructor(private service: RecipesService) {}

  ngOnInit(): void {
  }

  searchRecipes = (form: NgForm) => {
    let searchTerm = form.value.searchTerm;
    this.service
      .getRecipes(searchTerm)
      .subscribe((response) => {
        this.searchResult = response.hits;
      });
    this.searchSubmit.emit(this.searchResult);
  };
}