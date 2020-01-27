import {
  LOAD_COMMENT,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
} from "../actions/actions";

const initialsState = [];
export default (state = initialsState, action) => {
  switch (action.type) {
    case LOAD_COMMENT:
      return { comments: action.payload };
    case ADD_COMMENT:
      return { state: state.comments.push(action.payload), ...state };
    case DELETE_COMMENT:
      return { comments: action.payload };
    case UPDATE_COMMENT:
      return {
        comments: state.comments.map(element =>
          action.payload.id === element.id ? action.payload : element
        )
      };

    default:
      return state;
  }
};

// export default commentsReducer
