import { ActionCreator } from "redux";
import { IRepliesComment } from "./reducer";

export const REPLIES_COMMENT_UPDATE = 'REPLIES_COMMENT_UPDATE';

export type RepliesCommentUpdateActions = {
    type: typeof REPLIES_COMMENT_UPDATE;
    data: IRepliesComment;
}

export const repliesComment: ActionCreator<RepliesCommentUpdateActions> = (data: IRepliesComment) => ({
    type: REPLIES_COMMENT_UPDATE,
    data,
})

export const REPLIES_COMMENT_RESET = 'REPLIES_COMMENT_RESET';

export type RepliesCommentResetActions = {
    type: typeof REPLIES_COMMENT_RESET;
}

export const repliesCommentReset: ActionCreator<RepliesCommentResetActions> = () => ({
    type: REPLIES_COMMENT_RESET,
})