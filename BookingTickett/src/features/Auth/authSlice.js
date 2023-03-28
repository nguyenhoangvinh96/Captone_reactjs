import { produce } from 'immer';
import * as actionTypes from './constants';

const initialState = {
    infoUser: null,
}

export const authReducer = (state = initialState, { type, payload }) => {
    return produce(state, draft => {
        if (type === actionTypes.POST_LOGIN_INFO) {
            draft.infoUser = payload;
        }
        if (type === actionTypes.LOG_OUT) {
            draft.infoUser = null;
        }
    })
}