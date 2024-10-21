import type { CommentQuestion } from "../../enterprise/entities/comment-question";

export interface QuestionCommentRepository {
  create(question: CommentQuestion): Promise<void>
}