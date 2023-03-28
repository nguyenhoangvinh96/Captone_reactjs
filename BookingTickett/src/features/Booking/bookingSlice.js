import { produce } from 'immer'
import * as actionTypes from './constants'


const initialState = {
    banners: [],
    movies: [],
    infoTheater: [],
    selectedScheduleDetail: null,
    detailMovie: {},
    listSeat: {},

    orderSeats: [],
    isLoading: false,
    activeTabs: '1',
}

export const bookingReducer = (state = initialState, { type, payload }) => {
    return produce(state, draft => {
        if (type === actionTypes.FETCH_BANNERS) {
            draft.banners = payload
        }
        if (type === actionTypes.FETCH_MOVIES) {
            draft.movies = payload
        }
        if (type === actionTypes.FETCH_INFOR_THEATER) {
            draft.infoTheater = payload
        }
        if (type === actionTypes.FETCH_SCHEDULE_DETAIL) {
            draft.selectedScheduleDetail = payload
        }

        if (type === actionTypes.FETCH_DETAIL_MOVIE) {
            draft.detailMovie = payload
        }
        if (type === actionTypes.FETCH_LIST_SEAT) {
            draft.listSeat = payload
        }
        if (type === actionTypes.ORDER_SEAT) {
            let index = draft.orderSeats.findIndex(item => item.stt === payload.stt);
            // nếu chưa chọn thì thêm vào
            if (index === -1) {
                draft.orderSeats.push(payload)
            } else { // chọn rồi thì tháo ra
                draft.orderSeats = draft.orderSeats.filter(item => item.stt !== payload.stt)
            }
        }
        if (type === actionTypes.DISPLAY_LOADING) {
            draft.isLoading = true;
        }
        if (type === actionTypes.HIDDEN_LOADDING) {
            draft.isLoading = false;
        }
        if (type === actionTypes.COMPLETE_CHECKOUT) {
            draft.activeTabs = '2';
        }
        if (type === actionTypes.COMPLETE_CHECKOUT2) {
            draft.activeTabs = '3';
        }
        if (type === actionTypes.SET_DEFAULT_TAB) {
            draft.activeTabs = '1';
        }
        if (type === actionTypes.CLEAR_ORDER_SEAT) {
            draft.orderSeats = []
        }
    })
}