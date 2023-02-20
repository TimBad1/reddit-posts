import axios from "axios";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { URL_API } from "../../vars";
import { RootState } from "../reducer";

export const POSTS_REQUEST = 'POSTS_REQUEST';
export type PostsRequestAction = {
    type: typeof POSTS_REQUEST;
}

export const postsRequest: ActionCreator<PostsRequestAction> = () => ({
    type: POSTS_REQUEST, 
});

export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export type PostsRequestSuccessAction = {
    type: typeof POSTS_REQUEST_SUCCESS;
    data: IPostsRequestData[];
}

export const postsRequestSuccess: ActionCreator<PostsRequestSuccessAction> = (data:IPostsRequestData[]) => ({
    type: POSTS_REQUEST_SUCCESS,
    data,
});

export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';
export type PostsRequestErrorAction = {
    type: typeof POSTS_REQUEST_ERROR;
    error: string,
}

export const postsRequestError: ActionCreator<PostsRequestErrorAction> = (error: string) => ({
    type: POSTS_REQUEST_ERROR, 
    error,
});

export interface IPostsRequestData {
    id: string;
    author: string;
    title: string;
    rating: number;
    commentsCount: number;
    avatar: string;
    previewImg: string;
    datePostUtc: number;
    description: string;
    subreddit: string;
}

export interface IChildrenPostsRequestData {
    data:IPostsRequestData
}

export interface IPostsDataSrc {
    data: {
        children: IChildrenPostsRequestData[],
        after: string,
    }
}

function createPostsData(data: any[]){
    return data.map(item => {
        const el:IPostsRequestData = {
            id: "",
            author: "",
            title: "",
            rating: 0,
            commentsCount: 0,
            avatar: "",
            previewImg: '',
            datePostUtc: 0,
            description: "",
            subreddit: "",
        };     

        el.id = item.data.id;
        el.author = item.data.author;
        el.title = item.data.title;
        el.rating = item.data.ups;
        el.commentsCount = item.data.num_comments;
        el.previewImg = item.data.thumbnail || "https://www.film.ru/sites/default/files/styles/thumb_1024x450/public/movies/frames/41159194-1147476.jpg";
        el.avatar = item.data.sr_detail.icon_img || 'https://upload.wikimedia.org/wikipedia/ru/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png';
        el.datePostUtc = item.data.created_utc;
        el.description = item.data.sr_detail.public_description;
        el.subreddit = item.data.subreddit;

        return el
    })
}

export const POSTS_AFTER_REQUEST = 'POSTS_AFTER_REQUEST';
export type PostsAfterRequestAction = {
    type: typeof POSTS_AFTER_REQUEST;
    after: string;
}

export const postsAfterRequest: ActionCreator<PostsAfterRequestAction> = (after: string) => ({
    type: POSTS_AFTER_REQUEST, 
    after,
});

export const postsRequestAsync = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch(postsRequest());
    dispatch(postsRequestError(''));
    try {
        const { data: { data: { after, children }}} = await axios.get(`${URL_API}/best.json?sr_detail=true`, {
            headers: { Authorization: `bearer ${getState().getToken}` },
            params: {
            limit: 25,
            after: getState().posts.after,
            }
        });
        dispatch(postsAfterRequest(after));
        dispatch(postsRequestSuccess(createPostsData(children)));
    } catch(error) {
        dispatch(postsRequestError(String(error)));
    }
}
