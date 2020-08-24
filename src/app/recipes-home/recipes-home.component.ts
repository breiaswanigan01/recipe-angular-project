import { Component, OnInit, Input } from "@angular/core";
import { Recipe, Hit } from "../interfaces/recipe";
import { ActivatedRoute } from "@angular/router";
import { RecipesService } from "../recipes.service";

@Component({
	selector: "app-recipes-home",
	templateUrl: "./recipes-home.component.html",
	styleUrls: ["./recipes-home.component.css"],
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
			let term = params.get("term");
			let dietOptions = params.get("dietLabels");
			console.log(`term : ${term} dietOptions : ${dietOptions}`);
			this.edamam.getRecipes(term).subscribe((response) => {
				console.log("*********** ", response);
				this.recipeArray = response.hits;
			});
		});
	};
}
