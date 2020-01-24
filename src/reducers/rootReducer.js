import { LOAD_BLOG, ADD_BLOG, DELETE_BLOG, UPDATE_BLOG, LOAD_COMMENT, DELETE_COMMENT, UPDATE_COMMENT, ADD_COMMENT } from './types'

const initialsState = []

function rootReducer(state = initialsState, action) {
    switch (action.type) {
        case LOAD_BLOG:
            return { blog: action.payload }
        case LOAD_COMMENT:
            return { comment: action.payload }
        case ADD_BLOG:
            return { blog: Object.assign(state.blog, state.blog.push(action.payload)) }
        case ADD_COMMENT:
            return { comment: Object.assign(state.comment, state.comment.push(action.payload)) }
        case DELETE_BLOG:
            return { blog: action.payload }
        case DELETE_COMMENT:
            return { comment: action.payload }
        case UPDATE_BLOG:
            return {
                blog: state.blog.map(element => (
                    action.payload.id === element.id ? action.payload : element
                ))
            }
        case UPDATE_COMMENT:
            return {
                comment: state.comment.map(element => (
                    action.payload.id === element.id ? action.payload : element
                ))
            }

        default:
            return state;
    }
}

export default rootReducer