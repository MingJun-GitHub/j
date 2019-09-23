const initialState = {
   name: 'limiingjun'
};

function reducer(state, action) {
    switch (action.type) {
        case 'reset':
            return initialState;
        case 'setName':
            return {
                name: state.name
            };
        // case 'decrement':
        //     return {
        //         count: state.count - 1
        //     };
        default:
            return state;
    }
}
