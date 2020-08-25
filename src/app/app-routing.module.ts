import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesHomeComponent } from './recipes-home/recipes-home.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
const routes: Routes = [
  { path: 'search', component: RecipesHomeComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  // { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
