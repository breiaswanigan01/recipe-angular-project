export interface Recipe {
  label: string;
  dietLabels: string[];
  image: string;
  url: string;
  healthLabels: string[];
  ingredientLines: string[];
  totalTime: number;
}
export interface Hit {
  recipe: Recipe;
}