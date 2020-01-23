const initialsState = []

function rootReducer(state = initialsState, action) {
    switch (action.type) {
        case 'LOADBLOG':
            return { blog: action.payload }
        case 'ADDBLOG':
            return { blog: Object.assign(state.blog, state.blog.push(action.payload)) }
        case 'DELETEBLOG':
            return { blog: action.payload }
        case 'UPDATEBLOG':
            return {
                blog: state.blog.map(element => (
                    action.payload.id == element.id ? action.payload : element
                ))
            }

        default:
            return state;
    }
}

export default rootReducer