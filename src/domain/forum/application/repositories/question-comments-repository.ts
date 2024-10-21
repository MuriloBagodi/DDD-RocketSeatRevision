import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { CommentQuestion } from "../../enterprise/entities/comment-question";

export interface QuestionCommentRepository {
  findById(id: string): Promise<CommentQuestion | null>
  findManyByQuestionId(questionId: string, params: PaginationParams): Promise<CommentQuestion[]>
  create(question: CommentQuestion): Promise<void>
  delete(question: CommentQuestion): Promise<void>
}