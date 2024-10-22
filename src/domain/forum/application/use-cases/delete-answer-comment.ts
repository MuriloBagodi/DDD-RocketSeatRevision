import { type Either, left, right } from '@/core/either';
import type { CommentAnswer } from '../../enterprise/entities/comment-answer';
import type { AnswerCommentRepository } from "../repositories/answer-comments-repository"

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<string, { answerComment: CommentAnswer }>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) { }

  async execute({ authorId, answerCommentId }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      return left("Answer comment not found.")
    }

    if (answerComment.authorId.toString !== authorId) {
      return left("Not Allowed.")
    }

    await this.answerCommentRepository.delete(answerComment)

    return right({ answerComment })
  }
}