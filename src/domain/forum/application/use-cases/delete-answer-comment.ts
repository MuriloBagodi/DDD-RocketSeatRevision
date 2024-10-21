import type { CommentAnswer } from '../../enterprise/entities/comment-answer';
import type { AnswerCommentRepository } from "../repositories/answer-comments-repository"

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentUseCaseResponse {
  answerComment: CommentAnswer
}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) { }

  async execute({ authorId, answerCommentId }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error("Answer not found.")
    }

    if (answerComment.authorId.toString !== authorId) {
      throw new Error("Not allowed.")
    }

    await this.answerCommentRepository.delete(answerComment)

    return { answerComment }
  }
}