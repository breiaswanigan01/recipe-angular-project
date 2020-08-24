import { Component, OnInit } from '@angular/core';
import { Hit } from '../interfaces/recipe';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { range } from 'rxjs';

@Component({
  selector: 'app-recipes-home',
  templateUrl: './recipes-home.component.html',
  styleUrls: ['./recipes-home.component.css'],
})
export class RecipesHomeComponent implements OnInit {
  recipeArray: Hit[];
  constructor(private route: ActivatedRoute, private edamam: RecipesService) {}

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes = () => {
    // console.log('getRecipes');
    // console.log(recipes);

    // this.recipeArray = recipes;
    this.route.queryParamMap.subscribe((params) => {
      let term = params.get('term');
      let dietOptions = params.getAll('dietLabels');
      let minCal = params.get('minCal');
      let maxCal = params.get('maxCal');
    //   console.log(params.getAll("dietOptions"));
      console.log(
        `term : ${term} dietOptions : ${dietOptions}, minCal: ${minCal}, maxCal: ${maxCal}`
      );
      if (minCal !== '' && maxCal !== '') {
        let calorieRange = `${minCal}-${maxCal}`;
        console.log('print calorie range', calorieRange);
        this.edamam
          .getRecipesWithCalories(term, calorieRange)
          .subscribe((response) => {
            console.log('subscribe calories', response);
            this.recipeArray = response.hits;
          });
      } else {
        this.edamam.getRecipes(term).subscribe((response) => {
          console.log('*********** ', response);
          this.recipeArray = response.hits;
        });
      }
    });
  };
}
