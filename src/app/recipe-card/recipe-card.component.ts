import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from "../interfaces/recipe";

@Component({
	selector: "app-recipe-card",
	templateUrl: "./recipe-card.component.html",
	styleUrls: ["./recipe-card.component.css"],
})
export class RecipeCardComponent implements OnInit {
	@Input() record: Recipe;
	constructor() {}

	ngOnInit(): void {}
}
