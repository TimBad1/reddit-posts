import { Reducer } from "react";
import { initialState } from "../reducer";
import {    
    IPostsRequestData, 
    PostsAfterRequestAction, 
    PostsRequestAction, 
    PostsRequestErrorAction, 
    PostsRequestSuccessAction,
    POSTS_AFTER_REQUEST,
    POSTS_REQUEST,
    POSTS_REQUEST_ERROR,
    POSTS_REQUEST_SUCCESS
        } from "./actions";

export type PostsState = {
    loading: boolean;
    error: string;
    data: IPostsRequestData[];
    after: string;
}

export type PostsActions = PostsRequestAction
    | PostsRequestSuccessAction
    | PostsRequestErrorAction
    | PostsAfterRequestAction;

export const postsReducer: Reducer<PostsState, PostsActions> = (state = initialState.posts, action) => {
    switch(action.type) {
        case POSTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case POSTS_REQUEST_SUCCESS:
            return {
                ...state,
                data: state.data.concat(...action.data),
                loading: false,
            };
        case POSTS_REQUEST_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
            }   
        case POSTS_AFTER_REQUEST:
             return {
                ...state,
                after: action.after,
             }
        default:
            return state;
    }
}