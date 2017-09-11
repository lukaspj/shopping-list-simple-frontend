import { IIngredient } from './ingredient';

export interface IRecipe {
  id: number;
  name: string;
  description: string;
  image: string;
  ingredients: IIngredient[];
  steps: string;
  created_at: Date;
}
