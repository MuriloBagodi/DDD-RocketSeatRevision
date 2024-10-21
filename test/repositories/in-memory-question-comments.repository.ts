import type { QuestionCommentRepository } from "@/domain/forum/application/repositories/question-comments-repository"
import type { CommentQuestion } from "@/domain/forum/enterprise/entities/comment-question"

export class InMemoryQuestionCommentRepository implements QuestionCommentRepository {
  public items: CommentQuestion[] = []

  async create(commentQuestion: CommentQuestion) {
    this.items.push(commentQuestion)
  }
}