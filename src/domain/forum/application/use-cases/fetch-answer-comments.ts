import type { CommentAnswer } from "../../enterprise/entities/comment-answer"
import type { AnswerCommentRepository } from "../repositories/answer-comments-repository"

interface FetchRecentAnswersCommentsUseCaseRequest {
  page: number
  answerId: string
}

interface FetchRecentAnswersCommentsUseCaseResponse {
  answerComments: CommentAnswer[]
}

export class FetchRecentAnswersCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) { }

  async execute({ page, answerId }: FetchRecentAnswersCommentsUseCaseRequest): Promise<FetchRecentAnswersCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentRepository.findManyByAnswerId(answerId, { page })

    return { answerComments }
  }
}