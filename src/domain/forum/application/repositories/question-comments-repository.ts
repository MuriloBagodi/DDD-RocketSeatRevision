import type { CommentQuestion } from "../../enterprise/entities/comment-question";

export interface QuestionCommentRepository {
  findById(id: string): Promise<CommentQuestion | null>
  create(question: CommentQuestion): Promise<void>
  delete(question: CommentQuestion): Promise<void>
}