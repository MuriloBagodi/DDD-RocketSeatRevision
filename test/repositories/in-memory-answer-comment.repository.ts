import type { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comments-repository"
import type { CommentAnswer } from "@/domain/forum/enterprise/entities/comment-answer"

export class InMemoryAnswerCommentRepository implements AnswerCommentRepository {
  public items: CommentAnswer[] = []

  async create(commentAnswer: CommentAnswer) {
    this.items.push(commentAnswer)
  }

  async delete(answerComment: CommentAnswer) {
    const itemIndex = this.items.findIndex((item) => item.id === answerComment.id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string) {
    const answerComment = this.items.find((item) => item.id.toString === id)

    if (!answerComment) {
      return null
    }

    return answerComment
  }
}