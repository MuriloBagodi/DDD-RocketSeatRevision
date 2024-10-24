import { type Either, left, right } from '@/core/either';
import type { CommentAnswer } from '../../enterprise/entities/comment-answer';
import type { AnswerCommentRepository } from "../repositories/answer-comments-repository"
import { ResourceNotFoundError } from './errors/resourse-not-found.error';
import { NotAllowedError } from './errors/not-allowed.error';

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { answerComment: CommentAnswer }>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) { }

  async execute({ authorId, answerCommentId }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.authorId.toString !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answerCommentRepository.delete(answerComment)

    return right({ answerComment })
  }
}