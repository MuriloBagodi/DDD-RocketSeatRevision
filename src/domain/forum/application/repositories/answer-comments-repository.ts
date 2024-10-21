import type { CommentAnswer } from "../../enterprise/entities/comment-answer";

export interface AnswerCommentRepository {
  create(answer: CommentAnswer): Promise<void>
}