import { FETCH_MOVIES } from "../actions/index.js";

export default function(state=null, action){
  switch(action.type){
    case FETCH_MOVIES:
      if(action.payload.data.results){
        return action.payload.data.results;
      }
    default: return state;
  }
}
