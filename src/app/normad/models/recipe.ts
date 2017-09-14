import { IRecipeIngredient } from './recipe-ingredient';

export interface IRecipe {
  id: number;
  name: string;
  description: string;
  image: string;
  ingredients: IRecipeIngredient[];
  steps: string;
  created: Date;
}
