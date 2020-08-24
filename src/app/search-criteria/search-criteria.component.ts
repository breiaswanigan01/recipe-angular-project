import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { NgForm } from '@angular/forms';
import { Recipe, Hit } from '../interfaces/recipe';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css'],
})
export class SearchCriteriaComponent implements OnInit {
  @Output() searchSubmit = new EventEmitter<Hit[]>();

  searchResult: Hit[] = [];

  constructor(private service: RecipesService) {}

  ngOnInit(): void {}

  searchRecipes = (form: NgForm) => {
    console.log('Inside form ');
    console.log(form);

    // 1. Search by text
    let searchTerm = form.value.searchTerm;
    let dietOptions = form.value.dietFieldset;
    let dietOptionsSelected = this.getSelectedDietOptions(dietOptions);
    console.log('Checked diet options are ', dietOptionsSelected);

    // when  search term is entered and its not null
    this.service.getRecipes(searchTerm).subscribe((response) => {
      this.searchResult = response.hits;
    });

    // if (dietOptionsSelected.length > 0) {
    //   // if diet option is selected
    //   let filterArray: Hit[] = [];
    //   for (let option of dietOptionsSelected) {
    //     if (recipe.dietLabels.length > 0) {
    //     filterArray.concat(
    //       this.searchResult.filter((hit) => {
    //         console.log(option, '====', hit.recipe.dietLabels);
    //         return hit.recipe.dietLabels.includes(option);
    //       })
    //     );
    //   }
    // }
    //     console.log('********');
    //     console.log(filterArray);
    //     this.searchSubmit.emit(filterArray);
    //   } else {
    //     this.searchSubmit.emit(this.searchResult);
    //   }
    // };
    let filterArray: Hit[] = [];
    if (dietOptionsSelected.length > 0) {
      for (let hit of this.searchResult) {
        console.log('***#1$', hit);
        if (hit.recipe.dietLabels.length > 0) {
          for (let option of dietOptionsSelected) {
            console.log('***#2$', option);
            if (hit.recipe.dietLabels.includes(option)) {
              console.log('$', hit);
              filterArray.push(hit);
            }
          }
        }
      }
      console.log(filterArray);
      this.searchSubmit.emit(filterArray);
    } else {
      this.searchSubmit.emit(this.searchResult);
    }
  };
  // this method returns the array of checked options from the diet object
  getSelectedDietOptions(dietOptionObj: any) {
    let selectedOptions: string[] = [];
    for (const [key, value] of Object.entries(dietOptionObj)) {
      console.log(`${key}: ${value}`);
      if (value) {
        selectedOptions.push(key);
      }
    }
    return selectedOptions;
  }
}
