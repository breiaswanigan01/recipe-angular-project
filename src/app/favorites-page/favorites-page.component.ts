import { Component, OnInit } from "@angular/core";
import { RecipesService } from "../recipes.service";
import { Recipe } from "../interfaces/recipe";

@Component({
	selector: "app-favorites-page",
	templateUrl: "./favorites-page.component.html",
	styleUrls: ["./favorites-page.component.css"],
})
export class FavoritesPageComponent implements OnInit {
	favoriteRecipes: Recipe[] = [];
	constructor(private service: RecipesService) {}

	ngOnInit(): void {
		this.favoriteRecipes = this.service.getFavorites();
	}
}
