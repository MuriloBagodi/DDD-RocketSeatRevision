import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { CommentAnswer } from "../../enterprise/entities/comment-answer";

export interface AnswerCommentRepository {
  create(answer: CommentAnswer): Promise<void>
  delete(answer: CommentAnswer): Promise<void>
  findById(id: string): Promise<CommentAnswer | null>
  findManyByAnswerId(answerId: string, params: PaginationParams): Promise<CommentAnswer[]>
}