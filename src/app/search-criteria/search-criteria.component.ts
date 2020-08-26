import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { RecipesService } from "../recipes.service";
import { NgForm } from "@angular/forms";
import { Hit } from "../interfaces/recipe";
import { Router } from "@angular/router";

@Component({
	selector: "app-search-criteria",
	templateUrl: "./search-criteria.component.html",
	styleUrls: ["./search-criteria.component.css"],
})
export class SearchCriteriaComponent implements OnInit {
	@Output() searchSubmit = new EventEmitter<Hit[]>();

	searchResult: Hit[] = [];
	@Input() errorMsg: string = "";

	constructor(private service: RecipesService, private router: Router) {}

	ngOnInit(): void {}

	searchRecipes = (form: NgForm) => {
		console.log("Inside form ");
		console.log(form);

		console.log("====== ", form.value.dietOptions);

		let dietOptionsSelected = this.getSelectedDietOptions(
			form.value.dietOptions
		);
		console.log("Checked diet options are ", dietOptionsSelected.join());

		this.router.navigate(["search"], {
			queryParams: {
				term: form.value.searchTerm,
				diet: dietOptionsSelected.join(),
				minCal: form.value.minCalories,
				maxCal: form.value.maxCalories,
			},
		});
	};

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
