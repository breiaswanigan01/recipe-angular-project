import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { RecipesService } from "../recipes.service";
import { NgForm } from "@angular/forms";
import { Recipe, Hit } from "../interfaces/recipe";
import { Router } from "@angular/router";

@Component({
	selector: "app-search-criteria",
	templateUrl: "./search-criteria.component.html",
	styleUrls: ["./search-criteria.component.css"],
})
export class SearchCriteriaComponent implements OnInit {
	@Output() searchSubmit = new EventEmitter<Hit[]>();

	searchResult: Hit[] = [];

	constructor(private service: RecipesService, private router: Router) {}

	ngOnInit(): void {}

	searchRecipes = (form: NgForm) => {
		console.log("Inside form ");
		console.log(form);

		let dietOptions = form.value.dietFieldset;
		let dietOptionsSelected = this.getSelectedDietOptions(dietOptions);
		console.log("Checked diet options are ", dietOptionsSelected);

		this.router.navigate(["search"], {
			queryParams: {
				term: form.value.searchTerm,
				dietLabels: dietOptionsSelected,
			},
		});

		// 1. Search by text
		// let searchTerm = form.value.searchTerm;
		// let dietOptions = form.value.dietFieldset;
		// let dietOptionsSelected = this.getSelectedDietOptions(dietOptions);
		// console.log("Checked diet options are ", dietOptionsSelected);

		// this.service.getRecipes(searchTerm).subscribe((response) => {
		// 	this.searchResult = response.hits;
		// });

		// console.log("SearchResult =========  ", this.searchResult);
		// let filterArray: Hit[] = [];
		// if (dietOptionsSelected.length > 0) {
		// 	for (let hit of this.searchResult) {
		// 		// console.log("***#1$", hit);
		// 		if (hit.recipe.dietLabels.length > 0) {
		// 			for (let option of dietOptionsSelected) {
		// 				// console.log(
		// 				// 	"***#2$",
		// 				// 	option,
		// 				// 	" $$$  hit.recipe.dietLabels ",
		// 				// 	hit.recipe.dietLabels
		// 				// );
		// 				if (hit.recipe.dietLabels.includes(option)) {
		// 					console.log("$", hit);
		// 					filterArray.push(hit);
		// 				}
		// 			}
		// 		}
		// 	}
		// 	console.log(filterArray);
		// 	this.searchSubmit.emit(filterArray);
		// } else {
		// 	this.searchSubmit.emit(this.searchResult);
		// }
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
