import { LOAD_COMMENT, ADD_COMMENT, DELETE_COMMENT, UPDATE_COMMENT } from './types'

const initialsState = []
function rootReducer(state = initialsState, action) {
    switch (action.type) {
        case LOAD_COMMENT:
            return { comments: action.payload }
        case ADD_COMMENT:
            return { comments: Object.assign(state.comments, state.comments.push(action.payload)) }
        case DELETE_COMMENT:
            return { comments: action.payload }
        case UPDATE_COMMENT:
            return {
                comments: state.comments.map(element => (
                    action.payload.id === element.id ? action.payload : element
                ))
            }
        default:
            return state;
    }
}

export default rootReducer