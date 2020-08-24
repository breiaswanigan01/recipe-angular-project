import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipesHomeComponent } from "./recipes-home/recipes-home.component";

const routes: Routes = [
	{ path: "search", component: RecipesHomeComponent },
	{ path: "", redirectTo: "/search", pathMatch: "full" },
	// { path: "**", component: NotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
