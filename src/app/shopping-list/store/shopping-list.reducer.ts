import { Action } from '@ngrx/store';

import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number
}

export interface AppState {
  shoppingList: State
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}
/* Estado precisa ser imutável, assim não posso editar o estado existente ou anterior
... para copiar o estado anterior */
export function shoppingListReducer(
  state: State = initialState,
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
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.playload,
        editedIngredient: { ...state.ingredients[action.playload] } //copia o ingrediente que estou obtendo
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default: //usado por exemplo no carregamento inicial
      return state;
  }
}
