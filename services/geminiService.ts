
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            recipeName: { 
                type: Type.STRING,
                description: "The name of the recipe."
            },
            description: { 
                type: Type.STRING,
                description: "A short, enticing description of the dish."
            },
            ingredients: {
                type: Type.ARRAY,
                description: "A list of ingredients required for the recipe.",
                items: {
                    type: Type.OBJECT,
                    properties: {
                        name: { 
                            type: Type.STRING,
                            description: "Name of the ingredient." 
                        },
                        quantity: { 
                            type: Type.STRING,
                            description: "Quantity and unit (e.g., '2 cups', '1 tbsp')."
                        }
                    },
                    required: ['name', 'quantity']
                }
            },
            instructions: {
                type: Type.ARRAY,
                description: "Step-by-step cooking instructions.",
                items: { 
                    type: Type.STRING 
                }
            },
            cookTime: { 
                type: Type.STRING,
                description: "Estimated total cooking time (e.g., '45 minutes')."
            },
            difficulty: { 
                type: Type.STRING, 
                enum: ['Easy', 'Medium', 'Hard'],
                description: "The difficulty level of the recipe."
            }
        },
        required: ['recipeName', 'description', 'ingredients', 'instructions', 'cookTime', 'difficulty']
    }
};

export const generateRecipes = async (ingredients: string): Promise<Recipe[]> => {
    const prompt = `You are a mystical chef from a neon-lit future. Create 1 to 3 creative and delicious recipes based on the following available ingredients: ${ingredients}. Your response must be a JSON array that strictly adheres to the provided schema. Be imaginative with the recipe names and descriptions to fit the magical, neon theme.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recipeSchema,
            },
        });

        const jsonText = response.text.trim();
        const parsedRecipes: Omit<Recipe, 'id'>[] = JSON.parse(jsonText);
        
        // Add a unique ID to each recipe
        return parsedRecipes.map(recipe => ({
            ...recipe,
            id: `${recipe.recipeName.replace(/\s+/g, '-')}-${Date.now()}`
        }));

    } catch (error) {
        console.error("Error generating recipes:", error);
        throw new Error("Failed to conjure recipes. The magical ingredients might not be aligned. Please try again.");
    }
};