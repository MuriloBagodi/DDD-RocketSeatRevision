import type { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comments-repository"
import type { CommentAnswer } from "@/domain/forum/enterprise/entities/comment-answer"

export class InMemoryAnswerCommentRepository implements AnswerCommentRepository {
  public items: CommentAnswer[] = []

  async create(commentAnswer: CommentAnswer) {
    this.items.push(commentAnswer)
  }
}