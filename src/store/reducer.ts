import { Reducer } from "redux"
import { UpdateCommentAction, UPDATE_COMMENT } from './actions';
import { ME_REQUEST, ME_REQUEST_ERROR, ME_REQUEST_SUCCESS } from "./me/actions";
import { MeActions, meReducer, MeState } from "./me/reducer";
import { PostsActions, postsReducer, PostsState } from "./postsContent/reducer";
import { POSTS_AFTER_REQUEST, POSTS_REQUEST, POSTS_REQUEST_ERROR, POSTS_REQUEST_SUCCESS} from "./postsContent/actions";
import { CommentsActions, commentsReducer, CommentsState } from "./commentsPost/reducer";
import { COMMENTS_POSTS_REQUEST, COMMENTS_POSTS_REQUEST_ERROR, COMMENTS_POSTS_REQUEST_SUCCESS } from "./commentsPost/actions";
import { RepliesCommentActions, repliesCommentReducer, RepliesCommentState } from "./repliesComment/reducer";
import { REPLIES_COMMENT_RESET, REPLIES_COMMENT_UPDATE } from "./repliesComment/actions";
import { GET_TOKEN } from "./saveToken/actions";
import { TokenActions } from "./saveToken/reducer";


export type RootState = {
    getToken: string;
	commentText: string;
	me: MeState;
	posts: PostsState;
	comments: CommentsState;
	repliesComment: RepliesCommentState;
}

export const initialState: RootState = {
	commentText: '',
	getToken: '',
	me: {
		loading: false,
		error: '',
		data: {},
	},
	posts: {
		loading: false,
		error: '',
		data: [],
		after: '',
	},
	comments: {
		loading: false,
		error: '',
		data: [],
	},
	repliesComment: {
		user: '',
		id: '',
	}
}

type AllAction = UpdateCommentAction 
	| TokenActions
	| MeActions
	| PostsActions
	| CommentsActions
	| RepliesCommentActions ;

export const rootReducer: Reducer<RootState, AllAction> = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_COMMENT:
			return {
				...state,
				commentText: action.text,
			};
		case GET_TOKEN:
			return {
				...state,
				getToken: action.text,
			};
		case ME_REQUEST:
		case ME_REQUEST_SUCCESS:
		case ME_REQUEST_ERROR:
			return {
				...state,
				me: meReducer(state.me, action),
			};
		case POSTS_REQUEST:
		case POSTS_REQUEST_SUCCESS:
		case POSTS_REQUEST_ERROR:
		case POSTS_AFTER_REQUEST:
			return {
				...state,
				posts: postsReducer(state.posts, action),
			};
		case COMMENTS_POSTS_REQUEST:
		case COMMENTS_POSTS_REQUEST_SUCCESS:
		case COMMENTS_POSTS_REQUEST_ERROR:
			return {
				...state,
				comments: commentsReducer(state.comments, action),
			};
		case REPLIES_COMMENT_UPDATE:
		case REPLIES_COMMENT_RESET:
			return {
				...state,
				repliesComment: repliesCommentReducer(state.repliesComment, action)
			};
		default:
			return state;
	}	
}