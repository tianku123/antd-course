import request from '../util/request';

const delay = (millisecond) => {
    return new Promise((resolve) => {
        setTimeout(resolve, millisecond);
    });
};

export default {
    namespace: 'cards',
    state: {
        cardsList: [],
    },
    effects: {
        *queryList(_, sagaEffects) {
            const { call, put } = sagaEffects;
            const endPointURI = '/dev/cardsList';

            const puzzle = yield call(request, endPointURI);
            yield put({ type: 'addNewCard', payload: puzzle });
        },
        *addOne(_, sagaEffects) {
            const { call, put } = sagaEffects;
            const endPointURI = '/dev/addOne';

            const puzzle = yield call(request, endPointURI);
            yield put({ type: 'addNewCard', payload: puzzle });
        },
    },
    reducers: {
        addNewCard(state, { payload: data }) {
            console.log('cards', data)
            return {
                cardsList: data,
            };
        }
    },
};
