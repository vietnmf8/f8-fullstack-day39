 export const createStore = (reducer, preloadedState) => {
        let state = reducer(preloadedState, {
            type: "@@redux/INIT9.b.0.8.q.l",
        });

        const listeners = [];

        return {
            getState() {
                return state;
            },
            dispatch(action) {
                state = reducer(state, action);
                listeners.forEach((listener) => listener());
            },
            subscribe(listener) {
                listeners.push(listener);
                return () => {
                    const index = listeners.indexOf(listener);
                    listeners.splice(index, 1);
                };
            },
        };
    }

export default createStore
