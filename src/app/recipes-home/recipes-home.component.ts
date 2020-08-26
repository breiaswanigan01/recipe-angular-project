import { Component, OnInit, Input } from "@angular/core";
import { Hit } from "../interfaces/recipe";
import { ActivatedRoute } from "@angular/router";
import { RecipesService } from "../recipes.service";
import { range } from "rxjs";

@Component({
	selector: "app-recipes-home",
	templateUrl: "./recipes-home.component.html",
	styleUrls: ["./recipes-home.component.css"],
})
export class RecipesHomeComponent implements OnInit {
	recipeArray: Hit[] = [];
	favoriteArray: Hit[] = [];
	showIndex: number;
	@Input() favorite: number;

	errorMsg: string = "";
	constructor(private route: ActivatedRoute, private edamam: RecipesService) {}

	ngOnInit(): void {
		this.getRecipes();
		console.log("this.favorite ===== ", this.favorite);
		if (this.favorite !== null) {
			this.favoriteArray.push(this.recipeArray[this.favorite]);
		}
	}

	getRecipes = () => {
		this.route.queryParamMap.subscribe((params) => {
			let term: string = params.get("term");
			let diet: string[] = params.getAll("diet");
			let minCal: number =
				params.get("minCal") === "" ? 0 : parseFloat(params.get("minCal"));
			let maxCal: number =
				params.get("maxCal") === "" ? 0 : parseFloat(params.get("maxCal"));
			//   console.log(params.getAll("dietOptions"));

			console.log(
				`term : ${term} dietOptions : ${diet}, minCal: ${minCal}, maxCal: ${maxCal}`
			);
			if (maxCal > 0 && diet.join("").trim().length === 0) {
				let calorieRange = `${minCal}-${maxCal}`;
				console.log("print calorie range", calorieRange);
				this.edamam.getRecipesWithCalories(term, calorieRange).subscribe(
					(response) => {
						console.log("subscribe calories", response);
						this.recipeArray = response.hits;
					},
					(error) => {
						console.error(
							`Backend API returned code ${error.status}, ` +
								`body was: ${error.error}`
						);

						this.errorMsg = error.error;
					}
				);
			} else if (maxCal === 0 && diet.length > 0) {
				this.edamam.getRecipesWithDiet(term, diet.join()).subscribe(
					(response) => {
						console.log("subscribe diet", response);
						this.recipeArray = response.hits;
					},
					(error) => {
						console.error(
							`Backend API returned code ${error.status}, ` +
								`body was: ${error.error}`
						);

						this.errorMsg = error.error;
					}
				);
			} else {
				this.edamam.getRecipes(term).subscribe(
					(response) => {
						console.log("*********** ", response);
						this.recipeArray = response.hits;
					},
					(error) => {
						console.error(
							`Backend API returned code ${error.status}, ` +
								`body was: ${error.error}`
						);

						this.errorMsg = error.error;
					}
				);
			}
		});
	};
	setShowIndex = (index: number) => {
		this.showIndex = index;
		console.log(this.showIndex);
	};
	closeView = () => {
		this.showIndex = -1;
	};
}
