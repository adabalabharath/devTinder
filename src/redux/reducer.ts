import { User } from "../utils/Types";
import { ADD_USER, REMOVE_USER } from "./actionType";

type State = {
  user: User[];
};
const initial: State = {
  user: [],
};
// Define the action type
interface Action {
  type: string;
  payload?: User; // Assuming you're adding a single User
}

export const reducer = (state = initial, action: Action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        user: [action.payload],
      };
    case REMOVE_USER:
      return {
        ...state,
        user: [],
      };
    default:
      return state;
  }
};
