/**
 * @param {number} stackLength - length of state stack to log
 * @param {string} typeOfErrorAction - substr or name of action
 * @param {function} onError - on error handler
 * @param {function} prepareState
 */
export default (stackLength, typeOfErrorAction, onError, prepareState = state => state) => {
    const states = new Array(stackLength);

    return store => next => action => {
        const state = prepareState(store.getState());
        state.action = action.type;
        states.unshift(Object.assign({}, state));
        states.pop();
        if (action.type.indexOf(typeOfErrorAction) !== -1) {
            onError(states, action.payload.message, action.payload.stack);
        }
        next(action);
    };
};
