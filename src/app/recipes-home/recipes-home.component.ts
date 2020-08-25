import { Component, OnInit, Input } from '@angular/core';
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
  recipeArray: Hit[] = [];
  favoriteArray: Hit[] = [];
  showIndex: number;
  @Input() favorite: number;
  constructor(private route: ActivatedRoute, private edamam: RecipesService) {}

  ngOnInit(): void {
    this.getRecipes();
    console.log('this.favorite ===== ', this.favorite);
    if (this.favorite !== null) {
      this.favoriteArray.push(this.recipeArray[this.favorite]);
    }
  }

  getRecipes = () => {
    // console.log('getRecipes');
    // console.log(recipes);

    // this.recipeArray = recipes;
    this.route.queryParamMap.subscribe((params) => {
      let term = params.get('term');
      let diet = params.get('diet');
      let minCal = params.get('minCal') === '' ? '0' : params.get('minCal');
      let maxCal = params.get('maxCal');
      //   console.log(params.getAll("dietOptions"));
      console.log(
        `term : ${term} dietOptions : ${diet}, minCal: ${minCal}, maxCal: ${maxCal}`
      );
      if (minCal !== '' && maxCal !== '' && diet === 'None') {
        let calorieRange = `${minCal}-${maxCal}`;
        console.log('print calorie range', calorieRange);
        this.edamam
          .getRecipesWithCalories(term, calorieRange)
          .subscribe((response) => {
            console.log('subscribe calories', response);
            this.recipeArray = response.hits;
          });
      } else if (maxCal === '' && diet !== 'None') {
        this.edamam.getRecipesWithDiet(term, diet).subscribe((response) => {
          console.log('subscribe diet', response);
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
  setShowIndex = (index: number) => {
    this.showIndex = index;
    console.log(this.showIndex);
  };
}
