import { LOAD_BLOG, ADD_BLOG, DELETE_BLOG, UPDATE_BLOG } from './types'

const initialsState = []

function rootReducer(state = initialsState, action) {
    switch (action.type) {
        case LOAD_BLOG:
            return { blog: action.payload }
        case ADD_BLOG:
            return { blog: Object.assign(state.blog, state.blog.push(action.payload)) }
        case DELETE_BLOG:
            return { blog: action.payload }
        case UPDATE_BLOG:
            return {
                blog: state.blog.map(element => (
                    action.payload.id === element.id ? action.payload : element
                ))
            }

        default:
            return state;
    }
}

export default rootReducer