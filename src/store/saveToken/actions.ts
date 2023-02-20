import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducer";

export const GET_TOKEN = 'GET_TOKEN';
export type GetTokenAction = {
	type: typeof GET_TOKEN;
	text: string;
}

export const getToken: ActionCreator<GetTokenAction> = (text) => ({
	type: GET_TOKEN, 
	text,
})

export const saveToken = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch,getState) => {

const token = localStorage.getItem('token') || window.__token__;
	if(!token) return;
	localStorage.setItem('token', window.__token__);
	dispatch({ type: 'GET_TOKEN', text: window.__token__ });
}