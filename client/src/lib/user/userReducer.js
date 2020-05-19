import { SET_INFO_USER } from "./";

const initialState = {
  walking: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INFO_USER: {
      return {
        ...state,
        walking: [...action.obj],
      };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
