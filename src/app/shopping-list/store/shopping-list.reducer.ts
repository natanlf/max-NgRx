import { Action } from '@ngrx/store';

import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
}
/* Estado precisa ser imutável, assim não posso editar o estado existente ou anterior
... para copiar o estado anterior */
export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions) {
  switch(action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      } //copia os valores antigos e adiciona os novos
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      }; //copia o ingrediente e o atualiza com o novo valor
      const updatedIngredients = [...state.ingredients]; //copia o array de ingredientes
      updatedIngredients[action.payload.index] = updatedIngredient; //o array de ingredientes é atualizado

      return {
        ...state,
        ingredients: updatedIngredients
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== action.payload;
        })
      }
    default: //usado por exemplo no carregamento inicial
      return state;
  }
}
