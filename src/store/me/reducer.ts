import { Reducer } from "redux";
import { initialState } from "../reducer";
import {    MeRequestAction, 
            MeRequestSuccessAction, 
            MeRequestErrorAction, 
            ME_REQUEST, 
            ME_REQUEST_SUCCESS, 
            ME_REQUEST_ERROR
        } from "./actions";

export interface IUserData {
    name?: string;
    iconImg?: string;
}

export type MeState = {
    loading: boolean;
    error: string;
    data: IUserData;
}

export type MeActions = MeRequestAction
	| MeRequestSuccessAction
	| MeRequestErrorAction;

export const meReducer: Reducer<MeState, MeActions> = (state = initialState.me, action) => {
    switch(action.type) {
        case ME_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ME_REQUEST_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false,
            };
        case ME_REQUEST_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
            }    
        default:
            return state;
    }
}