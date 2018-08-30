import { FETCH_MOVIES } from "../actions/index.js";
import { FAVORITE_MOVIES } from "../actions/get-favorites.js";

export default function(state=null, action){
  switch(action.type){
    case FETCH_MOVIES:
      if(action.payload.data.results){
        return action.payload.data.results;
      }
      break;
    case FAVORITE_MOVIES:
      if(action.payload){
        return action.payload;
      }
      break;
    default: return state;
  }
}
