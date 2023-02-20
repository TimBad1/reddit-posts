import axios from "axios";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { URL_API } from "../../vars";
import { RootState } from "../reducer";

export interface IPostsComments {
    author: string;
    id: string;
    body: string;
    likes: number;
    subreddit: string;
    fullname: string;
    created_utc: number;
    replies?: IPostsComments[];
    putCommentData: (postId: string, author: string) => void;
}

export interface IChildrenComments {
    data:IPostsComments
}

export interface IPostsCommentsSrc {
    1: {
        data: {
            children: IChildrenComments[]
        }
    }
}

export const COMMENTS_POSTS_REQUEST = 'COMMENTS_POSTS_REQUEST';
export type CommentsRequestAction = {
    type: typeof COMMENTS_POSTS_REQUEST;
}

export const commentsRequest: ActionCreator<CommentsRequestAction> = () => ({
    type: COMMENTS_POSTS_REQUEST, 
});

export const COMMENTS_POSTS_REQUEST_SUCCESS = 'COMMENTS_POSTS_REQUEST_SUCCESS';
export type CommentsRequestSuccessAction = {
    type: typeof COMMENTS_POSTS_REQUEST_SUCCESS;
    data: IPostsComments[];
}

export const commentsRequestSuccess: ActionCreator<CommentsRequestSuccessAction> = (data:IPostsComments[]) => ({
    type: COMMENTS_POSTS_REQUEST_SUCCESS,
    data,
});

export const COMMENTS_POSTS_REQUEST_ERROR = 'COMMENTS_POSTS_REQUEST_ERROR';
export type CommentsRequestErrorAction = {
    type: typeof COMMENTS_POSTS_REQUEST_ERROR;
    error: string,
}

export const commentsRequestError: ActionCreator<CommentsRequestErrorAction> = (error: string) => ({
    type: COMMENTS_POSTS_REQUEST_ERROR, 
    error,
});

export function createPostsCommentsData(data: any[]){
    return data.map(item => {
        const el:IPostsComments = {
            author: '',
            id: '',
            body: '',
            likes: 0,
            subreddit: '',
            fullname: '',
            created_utc: 0,
            putCommentData: () => { },
        }

        el.id = item.data.id;
        el.author = item.data.author;
        el.body = item.data.body;
        el.likes = item.data.likes;
        el.subreddit = item.data.subreddit;
        el.fullname = item.data.author_fullname;
        el.created_utc = item.data.created_utc
        if(item.data.replies) {
            el.replies = createPostsCommentsData(item.data.replies.data.children)
        }
        return el
    })
    .filter(item => item.body !== '[removed]' && item.body !== undefined)
}

export const commentsRequestAsync = (id: string): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch,getState) => {
    dispatch(commentsRequest());
    axios.get<IPostsCommentsSrc>(`${URL_API}/comments/${id}`, {
        headers: { Authorization: `bearer ${getState().getToken}` }
    })
    .then(({data}) => {
        const commentsData = createPostsCommentsData(data[1].data.children);
        dispatch(commentsRequestSuccess( commentsData ));
    })
    .catch((error) => {
        console.log(error);
        dispatch(commentsRequestError(String(error)));
      });
}