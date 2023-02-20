import { Reducer } from "redux";
import { initialState } from "../reducer";
import {    CommentsRequestAction, 
            CommentsRequestSuccessAction, 
            CommentsRequestErrorAction, 
            COMMENTS_POSTS_REQUEST, 
            COMMENTS_POSTS_REQUEST_SUCCESS, 
            COMMENTS_POSTS_REQUEST_ERROR,
            IPostsComments
        } from "./actions";

// export type CommentsPosts = {
//     loading: boolean;
//     error: string;
//     data: IPostsComments[];
// }

export type CommentsState = {
    loading: boolean;
    error: string;
    data: IPostsComments[];
}

export type CommentsActions = CommentsRequestAction
	| CommentsRequestSuccessAction
	| CommentsRequestErrorAction;

export const commentsReducer: Reducer<CommentsState, CommentsActions> = (state = initialState.comments, action) => {
    switch(action.type) {
        case COMMENTS_POSTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case COMMENTS_POSTS_REQUEST_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false,
            };
        case COMMENTS_POSTS_REQUEST_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
            }    
        default:
            return state;
    }
}