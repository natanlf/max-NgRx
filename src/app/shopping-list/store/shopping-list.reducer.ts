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
export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
  switch(action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }
    default: //usado por exemplo no carregamento inicial
      return state;
  }
}
