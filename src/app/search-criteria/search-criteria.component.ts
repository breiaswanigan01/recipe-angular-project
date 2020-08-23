import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { RecipesService } from "../recipes.service";
import { NgForm } from "@angular/forms";
import { Recipe } from "../interfaces/recipe";

@Component({
	selector: "app-search-criteria",
	templateUrl: "./search-criteria.component.html",
	styleUrls: ["./search-criteria.component.css"],
})
export class SearchCriteriaComponent implements OnInit {
	@Output() searchSubmit = new EventEmitter<Recipe[]>();

	searchResult: Recipe[];

	constructor(private service: RecipesService) {}

	ngOnInit(): void {}

	searchRecipes = (form: NgForm) => {
		console.log("Inside form ");
		console.log(form);

		// 1. Search by text
		let searchTerm = form.value.searchTerm;
		let dietOptions = form.value.dietFieldset;
		let dietOptionsSelected = this.getSelectedDietOptions(dietOptions);
		console.log("Checked diet options are ", dietOptionsSelected);
		if (!searchTerm) {
			// when  search term is entered and its not null
			if (dietOptionsSelected.length > 0) {
				// if diet option is selected
			} else {
				// diet option is not selected
			}

			this.service.getRecipes(searchTerm).subscribe((response) => {
				this.searchResult = response.hits;
			});
		} else {
			// When search term is not entered but other criteria may be available
		}

		this.searchSubmit.emit(this.searchResult);
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
