export interface Recipe {
  id: string;
  recipeName: string;
  description: string;
  ingredients: {
    name: string;
    quantity: string;
  }[];
  instructions: string[];
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating?: number;
}