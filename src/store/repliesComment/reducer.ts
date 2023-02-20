import { Reducer } from "react";
import { initialState } from "../reducer";
import { RepliesCommentUpdateActions, RepliesCommentResetActions, REPLIES_COMMENT_UPDATE, REPLIES_COMMENT_RESET } from "./actions";

export interface IRepliesComment {
    user: string;
    id: string;
}

export type RepliesCommentState = {
    user: string;
    id: string;
}

export type RepliesCommentActions = RepliesCommentUpdateActions
    | RepliesCommentResetActions;

export const repliesCommentReducer: Reducer<RepliesCommentState,RepliesCommentActions> = (state = initialState.repliesComment, action) => {
    switch(action.type) {
        case REPLIES_COMMENT_UPDATE:
            return {
                ...state,
                id: action.data.id,
                user: action.data.user,
            }
        case REPLIES_COMMENT_RESET:
            return {
                ...state,
                user: '',
                id: '',
            }
        default:
            return state;
    }
}

export { REPLIES_COMMENT_RESET };
