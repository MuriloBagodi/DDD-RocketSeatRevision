import type { QuestionCommentRepository } from "@/domain/forum/application/repositories/question-comments-repository"
import type { CommentQuestion } from "@/domain/forum/enterprise/entities/comment-question"

export class InMemoryQuestionCommentRepository implements QuestionCommentRepository {
  public items: CommentQuestion[] = []

  async create(commentQuestion: CommentQuestion) {
    this.items.push(commentQuestion)
  }

  async delete(questionComment: CommentQuestion) {
    const itemIndex = this.items.findIndex((item) => item.id === questionComment.id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string) {
    const questionComment = this.items.find((item) => item.id.toString === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }
}