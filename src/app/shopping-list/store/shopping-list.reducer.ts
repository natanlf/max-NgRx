import { Action } from '@ngrx/store';

import { Ingredient } from "../../shared/ingredient.model";
import { ADD_INGREDIENT } from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
}
/* Estado precisa ser imutável, assim não posso editar o estado existente ou anterior
... para copiar o estado anterior */
export function shoppingListReducer(state = initialState, action: Action) {
  switch(action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action]
      }
  }
}
