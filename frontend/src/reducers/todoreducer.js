
const initialData = {
    list: []
}


    const reducer = (state = initialData, action) => {
        switch (action.type) {
        
            case 'updateState':
                const list = action.list;

                return {
                    ...state,
                    list: list
                }


            default:
                return state;
        }
    }

    export default reducer;