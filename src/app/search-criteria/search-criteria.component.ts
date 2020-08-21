import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css'],
})
export class SearchCriteriaComponent implements OnInit {
  searchTerm: string;
  constructor(private service: RecipesService) {}

  ngOnInit(): void {
    this.searchRecipes();
  }
  searchRecipes = () => {
    this.service.getRecipes('salad').subscribe((response) => {
      console.log(response.hits);
    });
  };
}
